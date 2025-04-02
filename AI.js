import { GoogleGenAI } from "@google/genai";
import chalk from "chalk";
import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBrQpD3bap-OQtuy0xi93Ytj7hkyeoW5c8" });

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready to use.. Listening for messages!');
});

client.initialize();



client.on('message', message => {
    let question = message.body.toLowerCase();
    let removeWords = function (txt) {
        var removeWordsArray = [
            "alex", "karan", "akhand", "aishu", "aishwarya", "asan"
        ];
        var expStr = removeWordsArray.join("\\b|\\b");
        return txt.replace(new RegExp(expStr, 'gi'), ' ').trim().replace(/ +/g, ' ');
    }
    let ques = removeWords(question).trim();
    // console.log(ques);

    ai.models
        .generateContent({
            model: "gemini-2.0-flash",
            contents: ques,
        }).then((response) => {
            let answer = response.text.trim();

            function formatText(answer) {
                return answer
                    .replace(/\n\s*\*/g, "\n")  // Extra '*' remove karega jo newline ke saath aata hai
                    .replace(/\n{3,}/g, "\n\n")  // 3 ya zyada blank lines ko 2 line space me convert karega
                    .replace(/\*\*(.*?)\*\*/g, "\n*$1*\n")  // **bold** ko *bold* me convert karega aur sirf baad me ek line space dega
                    .replace(/\n\n\*/g, "\n*")  // Bold heading ke pehle ki extra line remove karega
                    .replace(/\n\*/g, "\n*")  // Bold heading ke neeche ka extra white space remove karega
                    .replace(/\n\s*\n\*/g, "\n*")  // Bold heading ke just neeche extra line hata raha hai
                    .replace(/🎯/g, "\n🎯🔥")  // 🎯 emoji ke saath 🔥 add kiya for extra style
                    .replace(/✅/g, "\n✅💡")  // ✅ ke saath 💡 for a creative touch
                    .replace(/🔥/g, "\n🔥🚀")  // 🔥 ke saath 🚀 for motivation
                    .replace(/💻/g, "\n💻✨")  // 💻 ke saath ✨ for coding vibes
                    .replace(/📚/g, "\n📚📖")  // 📚 ke saath 📖 for learning
                    .replace(/- /g, "\n• ")  // Bullet points ke liye "-" ko "•" me replace karega aur ek new line dega
                    .replace(/•/g, "\n•")  // Har bullet point ke baad ek extra line space dega
                    .trim();  // Extra spaces remove karega
            }

            let ans = formatText(answer);


            if (question === "alex" || question === "karan" || question === "aishu" || question === "aishwarya" || question === "asan" || question === "akhand") {
                console.log("Question:", question);
                message.reply("*After writing my this name.. Ask your question i will reply you!*😇😇");
                console.log("Answer:", "After writing my this name.. Ask your question i will reply you!");
                console.log("");
            }
            else if (question === "hello" || question === "hlo" || question === "hi" || question === "hey" || ques === "heyy") {
                console.log("Question:", question);
                message.reply("*Hey Buddy how can i help you?*😊");
                console.log("Answer:", "Hey Buddy how can i help you?");
                console.log("");
            }
            else if (question === "who made you?" || question === "who made you") {
                console.log("Question:", question);
                message.reply("By a Pro Person named *Karan*😎😎. He is a very Talented Man you don't know.🥰");
                console.log("Answer:", "By a Pro Person named Karan. He is a very Talented Man you don't know.");
                console.log("");
            }
            else if (question === "help") {
                console.log("Question:", question);
                message.reply("*Hey there..'👋👋 I am Artificial Intelligence bot made by Karan*\n*You can message him here if you face any problem or bug💀 regarding the bot🤖🤖🤖🤖🤖*\n\n*https://wa.me/+919555970959* \n\n*To make me start use a prefix of my name before asking a question.* \n*My names are as Follows:*\n*1) Karan* \n*2) Aishu* \n*3) Aishwarya* \n*4) Akhand* \n*5) Alex* \n*6) Asan*");
                console.log("Answer:", "Hey there.. I am Artificial Intellogence bot made by Karan\nYou can message him here if you face any problem or bug regarding the bot\nhttps://wa.me/+919555970959\nIf you want source code of the bot you can purchase it..");
                console.log("");
            }
            else if (question.startsWith("alex") || question.startsWith("karan") || question.startsWith("aishu") || question.startsWith("akhand") || question.startsWith("aishwarya") || question.startsWith("asan")) {
                console.log("Question:", ques);
                message.reply(ans);
                console.log("Answer:", ans);
                console.log("");
            }
        }).catch((error) => {
            message.reply("*Server is Hanging please hold on..😥😥*");
        });
});
