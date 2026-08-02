export type MuseumSection = {
	id: string;
	number: string;
	subtitle: string;
	title: string;
	description: string;
	tags: string[];
	imageUrl: string;
	accent: string;
	narrationText: string;
	longDescription: string;
	facts: { label: string; value: string }[];
};

export const sections: MuseumSection[] = [
	{
		id: "taj-mahal",
		number: "01",
		subtitle: "A monument of love and empire",
		title: "Taj Mahal",
		description:
			"Discover the Mughal masterpiece of white marble, built by Emperor Shah Jahan in memory of Mumtaz Mahal.",
		tags: ["Mughal Empire", "Agra", "Marble Architecture"],
		imageUrl:
			"https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop",
		accent: "#d9ad68",
		narrationText:
			"The Taj Mahal is one of the most celebrated monuments in the world. Built during the Mughal period, its marble architecture combines Persian, Central Asian and Indian traditions.",
		longDescription:
			"Emperor Shah Jahan commissioned the Taj Mahal as a mausoleum for his wife Mumtaz Mahal, who died in 1631. Construction began around 1632 and the principal mausoleum was substantially completed in the 1640s. The complex combines a monumental marble tomb with gardens, a mosque and a guest house. Intricate stone inlay, carved marble and calligraphy make the Taj Mahal one of the finest surviving examples of Mughal architecture.",
		facts: [
			{ label: "Location", value: "Agra, Uttar Pradesh" },
			{ label: "Period", value: "17th century" },
			{ label: "Commissioned by", value: "Emperor Shah Jahan" },
			{ label: "Purpose", value: "Mausoleum of Mumtaz Mahal" },
		],
	},

	{
		id: "qutub-minar",
		number: "02",
		subtitle: "The towering landmark of Delhi",
		title: "Qutub Minar",
		description:
			"Explore one of Delhi’s oldest surviving monumental structures and an important example of early Indo-Islamic architecture.",
		tags: ["Delhi Sultanate", "Delhi", "Indo-Islamic"],
		imageUrl:
			"https://images.unsplash.com/photo-1716747713381-ebdd06319cdd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		accent: "#c8794b",
		narrationText:
			"Rising above the historic neighbourhood of Mehrauli, the Qutub Minar represents the beginnings of a new architectural tradition in medieval Delhi.",
		longDescription:
			"Construction of the Qutub Minar was begun by Qutb-ud-din Aibak around 1199 and continued by later rulers. The tower forms part of the Qutub complex, which contains several important monuments from the early Delhi Sultanate. Built primarily from red and buff sandstone, its five storeys feature fluting, balconies and bands of inscriptions.",
		facts: [
			{ label: "Location", value: "Mehrauli, Delhi" },
			{ label: "Started", value: "c. 1199 CE" },
			{ label: "Height", value: "Approximately 73 metres" },
			{ label: "Material", value: "Red and buff sandstone" },
		],
	},

	{
		id: "sanchi-stupa",
		number: "03",
		subtitle: "A gateway to ancient Buddhism",
		title: "Great Stupa at Sanchi",
		description:
			"Step into one of the oldest surviving Buddhist monuments in India and explore its remarkable carved gateways.",
		tags: ["Buddhism", "Mauryan Empire", "Ancient India"],
		imageUrl:
			"https://images.unsplash.com/photo-1585744945554-5df801d2b680?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		accent: "#c59b58",
		narrationText:
			"The Great Stupa at Sanchi began during the reign of Emperor Ashoka and grew into one of the most important Buddhist sites in India.",
		longDescription:
			"The original stupa was commissioned by Emperor Ashoka in the 3rd century BCE. It was later enlarged and surrounded by elaborate stone railings and four gateways. The gateways contain detailed carvings depicting scenes and symbols associated with Buddhist traditions. Sanchi provides an extraordinary record of early Buddhist architecture and art.",
		facts: [
			{ label: "Location", value: "Sanchi, Madhya Pradesh" },
			{ label: "Original construction", value: "3rd century BCE" },
			{ label: "Associated ruler", value: "Emperor Ashoka" },
			{ label: "Tradition", value: "Buddhist" },
		],
	},

	{
		id: "ajanta-caves",
		number: "04",
		subtitle: "Stories painted inside the mountains",
		title: "Ajanta Caves",
		description:
			"Discover ancient Buddhist monasteries and some of the finest surviving paintings and sculptures of early India.",
		tags: ["Buddhist Art", "Rock-Cut Architecture", "Maharashtra"],
		imageUrl:
			"https://plus.unsplash.com/premium_photo-1697730367686-227c2b07d279?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		accent: "#8f684e",
		narrationText:
			"Carved into a horseshoe-shaped cliff, the Ajanta Caves preserve centuries of Buddhist art, architecture and storytelling.",
		longDescription:
			"The Ajanta complex contains around thirty excavated caves created in several phases between approximately the 2nd century BCE and 6th century CE. The caves include monasteries and prayer halls decorated with sculptures and murals. Their paintings provide a rare glimpse into the artistic traditions, clothing, society and religious stories of ancient India.",
		facts: [
			{ label: "Location", value: "Maharashtra" },
			{ label: "Caves", value: "Around 30 excavated caves" },
			{ label: "Period", value: "2nd century BCE–6th century CE" },
			{ label: "Tradition", value: "Buddhist" },
		],
	},

	{
		id: "kailasa-temple",
		number: "05",
		subtitle: "A temple carved from a mountain",
		title: "Kailasa Temple",
		description:
			"Marvel at the extraordinary monolithic temple at Ellora, excavated directly from living rock.",
		tags: ["Ellora", "Rashtrakutas", "Hindu Architecture"],
		imageUrl:
			"https://plus.unsplash.com/premium_photo-1691031428291-1db669413fa0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		accent: "#a97b55",
		narrationText:
			"The Kailasa Temple is one of the most ambitious rock-cut monuments ever created, transformed from a single mass of stone into a monumental temple complex.",
		longDescription:
			"The Kailasa Temple at Ellora is generally associated with the Rashtrakuta ruler Krishna I and dates to the 8th century CE. Rather than being assembled from individual blocks, the temple was excavated from the surrounding rock, working from the top downward. The complex contains shrines, courtyards, sculptures and monumental representations of Hindu deities.",
		facts: [
			{ label: "Location", value: "Ellora, Maharashtra" },
			{ label: "Period", value: "8th century CE" },
			{ label: "Dynasty", value: "Rashtrakuta" },
			{ label: "Construction", value: "Excavated from living rock" },
		],
	},

	{
		id: "brihadisvara-temple",
		number: "06",
		subtitle: "The architectural glory of the Cholas",
		title: "Brihadisvara Temple",
		description:
			"Explore one of the greatest achievements of South Indian temple architecture, built during the height of the Chola Empire.",
		tags: ["Chola Empire", "Tamil Nadu", "Dravidian Architecture"],
		imageUrl:
			"https://cdn.britannica.com/66/250066-050-B34A9532/Brihadishvara-Temple-Thanjavur-Tamil-Nadu-India.jpg",
		accent: "#c58f52",
		narrationText:
			"Built over a thousand years ago, the Brihadisvara Temple demonstrates the extraordinary engineering and artistic ambition of the Chola Empire.",
		longDescription:
			"The Brihadisvara Temple was commissioned by Chola emperor Rajaraja I and consecrated around 1010 CE. Its enormous vimana dominates the complex, while inscriptions record details about the temple, its administration and its patronage. The temple is part of the UNESCO-listed Great Living Chola Temples.",
		facts: [
			{ label: "Location", value: "Thanjavur, Tamil Nadu" },
			{ label: "Completed", value: "c. 1010 CE" },
			{ label: "Builder", value: "Rajaraja Chola I" },
			{ label: "Architectural style", value: "Dravidian" },
		],
	},

	{
		id: "hampi",
		number: "07",
		subtitle: "The lost capital of Vijayanagara",
		title: "Hampi",
		description:
			"Walk through the spectacular ruins of one of medieval India’s greatest imperial cities.",
		tags: ["Vijayanagara", "Karnataka", "Medieval India"],
		imageUrl:
			"https://images.unsplash.com/photo-1689946727963-be60e05fe278?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		accent: "#a9784e",
		narrationText:
			"Hampi was once the magnificent capital of the Vijayanagara Empire, filled with temples, markets, palaces and monumental gateways.",
		longDescription:
			"The Vijayanagara Empire established Hampi as its capital in the 14th century. The city grew into a major political, religious and commercial centre, attracting merchants and travellers from across the world. Its monumental landscape includes temples, royal enclosures, markets, water systems and elaborate stone architecture. The city suffered major destruction after the Battle of Talikota in 1565.",
		facts: [
			{ label: "Location", value: "Karnataka" },
			{ label: "Empire", value: "Vijayanagara Empire" },
			{ label: "Founded", value: "14th century" },
			{ label: "Major decline", value: "After the Battle of Talikota, 1565" },
		],
	},

	{
		id: "amber-fort",
		number: "08",
		subtitle: "A palace above the Aravallis",
		title: "Amber Fort",
		description:
			"Discover the hilltop palace and fortress that represents the grandeur of Rajasthan’s Rajput courts.",
		tags: ["Rajput", "Rajasthan", "Fort Architecture"],
		imageUrl:
			"https://images.unsplash.com/photo-1649073868642-bcbbd06239d8?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		accent: "#c88b4d",
		narrationText:
			"Rising above the hills near Jaipur, Amber Fort combines Rajput defensive architecture with lavish palace interiors influenced by Mughal design.",
		longDescription:
			"The fort developed under several Rajput rulers, with major construction beginning under Raja Man Singh I in the late 16th century. Its courtyards, palaces, gardens, decorated halls and defensive walls reveal the wealth and sophistication of the Kachhwaha Rajput court. The complex forms part of the UNESCO-listed Hill Forts of Rajasthan.",
		facts: [
			{ label: "Location", value: "Amber, Rajasthan" },
			{ label: "Major builder", value: "Raja Man Singh I" },
			{ label: "Period", value: "16th–18th centuries" },
			{ label: "Setting", value: "Aravalli Hills" },
		],
	},

	{
		id: "charminar",
		number: "09",
		subtitle: "The symbol of Hyderabad",
		title: "Charminar",
		description:
			"Explore the iconic four-arched monument at the historic heart of Hyderabad.",
		tags: ["Qutb Shahi", "Hyderabad", "Deccan"],
		imageUrl:
			"https://images.unsplash.com/photo-1750834115164-8c2658f18dd0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		accent: "#a87852",
		narrationText:
			"Built in 1591, Charminar became the architectural centre of Hyderabad and remains one of the most recognisable monuments of the Deccan.",
		longDescription:
			"Charminar was commissioned by Muhammad Quli Qutb Shah in 1591 and became the centrepiece of the newly established city of Hyderabad. Its four monumental arches and minarets combine Islamic architectural traditions with regional decorative forms. The monument remains surrounded by the historic markets of the old city.",
		facts: [
			{ label: "Location", value: "Hyderabad, Telangana" },
			{ label: "Built", value: "1591" },
			{ label: "Founder", value: "Muhammad Quli Qutb Shah" },
			{ label: "Dynasty", value: "Qutb Shahi" },
		],
	},

	{
		id: "red-fort",
		number: "10",
		subtitle: "From Mughal capital to national symbol",
		title: "Red Fort",
		description:
			"Explore the monumental Mughal fort-palace complex that later became one of the most powerful symbols of independent India.",
		tags: ["Mughal Empire", "Delhi", "Independence"],
		imageUrl:
			"https://images.unsplash.com/photo-1685790582503-1b2762d95407?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		accent: "#a95e45",
		narrationText:
			"Built by Shah Jahan as the centre of his new capital, the Red Fort later became deeply connected with India’s independence and national identity.",
		longDescription:
			"Construction of the Red Fort began in 1638 when Shah Jahan moved his capital from Agra to Shahjahanabad. The complex contained imperial residences, audience halls, gardens, mosques and ceremonial spaces. Built primarily from red sandstone, it represents the height of Mughal palace architecture. After independence, the fort became the traditional site of the Prime Minister’s Independence Day address.",
		facts: [
			{ label: "Location", value: "Old Delhi" },
			{ label: "Construction", value: "1638–1648" },
			{ label: "Builder", value: "Emperor Shah Jahan" },
			{ label: "Material", value: "Red sandstone" },
		],
	},
];
