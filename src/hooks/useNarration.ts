import { useCallback, useEffect, useRef, useState } from "react";

type NarrationState = "idle" | "playing" | "paused";

export function useNarration() {
	const [state, setState] = useState<NarrationState>("idle");
	const [activeId, setActiveId] = useState<string | null>(null);
	const [rate, setRate] = useState(0.95);
	const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

	useEffect(() => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
		const pickVoice = () => {
			const voices = window.speechSynthesis.getVoices();
			if (!voices.length) return;
			preferredVoiceRef.current =
				voices.find((v) => /en-IN/i.test(v.lang)) ||
				voices.find((v) => /en-GB/i.test(v.lang)) ||
				voices.find((v) => /en/i.test(v.lang)) ||
				voices[0];
		};
		pickVoice();
		window.speechSynthesis.addEventListener("voiceschanged", pickVoice);
		return () =>
			window.speechSynthesis.removeEventListener("voiceschanged", pickVoice);
	}, []);

	const stop = useCallback(() => {
		if (typeof window === "undefined") return;
		window.speechSynthesis.cancel();
		setState("idle");
		setActiveId(null);
	}, []);

	const play = useCallback(
		(id: string, text: string) => {
			if (typeof window === "undefined" || !("speechSynthesis" in window))
				return;
			window.speechSynthesis.cancel();
			const utterance = new SpeechSynthesisUtterance(text);
			if (preferredVoiceRef.current)
				utterance.voice = preferredVoiceRef.current;
			utterance.rate = rate;
			utterance.pitch = 1;
			utterance.volume = 1;
			utterance.onstart = () => {
				setState("playing");
				setActiveId(id);
			};
			utterance.onend = () => {
				setState("idle");
				setActiveId(null);
			};
			utterance.onerror = () => {
				setState("idle");
				setActiveId(null);
			};
			window.speechSynthesis.speak(utterance);
		},
		[rate],
	);

	const pause = useCallback(() => {
		if (typeof window === "undefined") return;
		window.speechSynthesis.pause();
		setState("paused");
	}, []);

	const resume = useCallback(() => {
		if (typeof window === "undefined") return;
		window.speechSynthesis.resume();
		setState("playing");
	}, []);

	const toggle = useCallback(
		(id: string, text: string) => {
			if (activeId === id && state === "playing") {
				pause();
				return;
			}
			if (activeId === id && state === "paused") {
				resume();
				return;
			}
			play(id, text);
		},
		[activeId, state, play, pause, resume],
	);

	useEffect(
		() => () => {
			if (typeof window !== "undefined") window.speechSynthesis.cancel();
		},
		[],
	);

	return { state, activeId, rate, setRate, toggle, stop };
}
