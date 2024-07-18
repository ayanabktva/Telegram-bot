import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
interface IFormTelegram {
    username: string;
    email: string;
    subject: string;
    description: string;
}

const TOKEN = import.meta.env.VITE_TG_TOKEN;
const CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;
console.log(TOKEN);
console.log(CHAT_ID);
const TelegramBot = () => {
    const { register, handleSubmit } = useForm<IFormTelegram>();

    const messageModel = (data: IFormTelegram) => {
        let messageTG = `Username: <b> ${data.username}</b> \n`;
        messageTG += `Email Adress: <b> ${data.email}</b> \n`;
        messageTG += `Subject: <b> ${data.subject}</b> \n`;
        messageTG += `Description: <b> ${data.description}</b>`;
        return messageTG;
    };

    const onSubmit: SubmitHandler<IFormTelegram> = async (data) => {
        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: messageModel(data),
        });
    };
    return (
        <div>
            <h1>TelegramBot</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    placeholder="username"
                    type="text"
                    {...register("username", {
                        required: true,
                    })}
                />
                <input
                    placeholder="email"
                    type="text"
                    {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                />
                <input
                    placeholder="subject"
                    type="text"
                    {...register("subject", { required: true })}
                />
                <input
                    placeholder="description"
                    type="text"
                    {...register("description", { required: true })}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default TelegramBot;
