import mongoose from "mongoose";
import Song from "../models/song.model.js";
import { config } from "dotenv";
import { connectDB, disConnectDB } from "../lib/db.js";

config();

const songs = [
	{
		title: "Aaj Ki Party",
		artist: "Mika Singh",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/Aaj_Ki_Party.mp3",
		duration: 46,
	},
	{
		title: "Aayat Arif - Eid Mubarak",
		artist: "Aayat Arif",
		imageUrl: "/cover-images/2.jpg",
		audioUrl: "/songs/Aayat_Arif_Eid_Mubarak.mp3",
		duration: 41,
	},
	{
		title: "Balti Rap Song - Eid Mubarak",
		artist: "Unknown",
		imageUrl: "/cover-images/3.jpg",
		audioUrl: "/songs/Balti_Rap_Song_Eid_Mubarak.mp3",
		duration: 24,
	},
	{
		title: "Believer",
		artist: "Imagine Dragons",
		imageUrl: "/cover-images/4.jpg",
		audioUrl: "/songs/Believer.mp3",
		duration: 24,
	},
	{
		title: "Chand Nazar Aa Gaya",
		artist: "Arshad Warsi, Namrata S.",
		imageUrl: "/cover-images/5.jpg",
		audioUrl: "/songs/Chand_Nazar_Aa_Gaya.mp3",
		duration: 36,
	},
	{
		title: "Chap Chap Chap Eid Mubarak",
		artist: "Zoya Ansari",
		imageUrl: "/cover-images/6.jpg",
		audioUrl: "/songs/Chap_Chap_Chap_Eid_Mubarak.mp3",
		duration: 40,
	},
	{
		title: "Daku",
		artist: "Unknown",
		imageUrl: "/cover-images/7.jpg",
		audioUrl: "/songs/Daku.mp3",
		duration: 39,
	},
	{
		title: "Eid Mubarak - Kamal King",
		artist: "Kamal King ft. Kamil Hussain",
		imageUrl: "/cover-images/8.jpg",
		audioUrl: "/songs/Eid_Mubarak_Kamal_King.mp3",
		duration: 28,
	},
	{
		title: "Eid Mubarak Eid Mubarak",
		artist: "Unknown",
		imageUrl: "/cover-images/9.jpg",
		audioUrl: "/songs/Eid_Mubarak_Eid_Mubarak.mp3",
		duration: 28,
	},
	{
		title: "Eid Mubarak Special 2018",
		artist: "Heena Song",
		imageUrl: "/cover-images/10.jpg",
		audioUrl: "/songs/Eid_Mubarak_Special_2018.mp3",
		duration: 30,
	},
	{
		title: "Excuses",
		artist: "AP Dhillon",
		imageUrl: "/cover-images/11.jpg",
		audioUrl: "/songs/Excuses.mp3",
		duration: 29,
	},
	{
		title: "First Class - Kalank",
		artist: "Arijit Singh",
		imageUrl: "/cover-images/12.jpg",
		audioUrl: "/songs/First_Class_Kalank.mp3",
		duration: 17,
	},
	{
		title: "Gangster",
		artist: "Unknown",
		imageUrl: "/cover-images/13.jpg",
		audioUrl: "/songs/Gangster.mp3",
		duration: 39,
	},
	{
		title: "Mera Sona Sajan Ghar Aaya",
		artist: "Kapil Jhaveri, Saloni Aswani",
		imageUrl: "/cover-images/14.jpg",
		audioUrl: "/songs/Mera_Sona_Sajan_Ghar_Aaya.mp3",
		duration: 27,
	},
	{
		title: "Money Heist",
		artist: "Unknown",
		imageUrl: "/cover-images/15.jpg",
		audioUrl: "/songs/Money_Heist.mp3",
		duration: 36,
	},
	{
		title: "Mubarak Eid Mubarak",
		artist: "Tumko Na Bhool Paayenge",
		imageUrl: "/cover-images/16.jpg",
		audioUrl: "/songs/Mubarak_Eid_Mubarak.mp3",
		duration: 39,
	},
	{
		title: "Mubarak Eid Mubarak Dance",
		artist: "Sandeep Dance Studio",
		imageUrl: "/cover-images/17.jpg",
		audioUrl: "/songs/Mubarak_Eid_Mubarak_Dance.mp3",
		duration: 39,
	},
	{
		title: "No Love",
		artist: "Unknown",
		imageUrl: "/cover-images/18.jpg",
		audioUrl: "/songs/No_Love.mp3",
		duration: 29,
	},
	{
		title: "Peaky Blinders Theme",
		artist: "Unknown",
		imageUrl: "/cover-images/19.jpg",
		audioUrl: "/songs/Peaky_Blinders.mp3",
		duration: 39,
	},
	{
		title: "Sarker",
		artist: "Unknown",
		imageUrl: "/cover-images/20.jpg",
		audioUrl: "/songs/Sarker.mp3",
		duration: 39,
	},
	{
		title: "Tu Mujhe Phir",
		artist: "Unknown",
		imageUrl: "/cover-images/21.jpg",
		audioUrl: "/songs/Tu_Mujhe_Phir.mp3",
		duration: 39,
	},
	{
		title: "We Rollin",
		artist: "Shubh",
		imageUrl: "/cover-images/22.jpg",
		audioUrl: "/songs/We_Rollin.mp3",
		duration: 39,
	},
];


const seedSongs = async () => {
	try {
		await connectDB();

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		await disConnectDB();
	}
};

seedSongs();