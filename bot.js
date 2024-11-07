const telegramBot=require('node-telegram-bot-api');
const cron=require('node-cron');
const token ='7565672524:AAGaVZRnBsslkSHkn5jCuzACU-finHeZdkc';
const bot= new telegramBot(token,{polling:true});

bot.on('message',(msg)=>{
     const chatId=msg.chat.id;
     bot.sendMessage(chatId,'hello sweetheart')
})

bot.on('new_chat_members', (msg) => {
     const userId = msg.from.id;
     const welcomeMessage = `hello new comer`;
     bot.sendMessage(userId, welcomeMessage);
   });
   
   bot.on('message', (msg) => {
     const chatId = msg.chat.id;
     const text = msg.text.toLowerCase();
   
     
     const bannedWords = ['spam', 'link'];
     if (bannedWords.some(word => text.includes(word))) {
       bot.deleteMessage(chatId, msg.message_id);
       bot.restrictChatMember(chatId, msg.from.id, { can_send_messages: false });
     }
   });

   //every min at 8.00 am every day every month and every day in the week will send good morning
   cron.schedule('0 8 * * *', () => {
    bot.sendMessage(984314473, 'good morning');
   });
   

bot.onText(/\/ban (\d+)/, (msg, match) => {
     //(\d+) da ely hwa userId we kaman hwa el match[1] 
     const chatId = msg.chat.id;
     const userId = match[1];
     bot.kickChatMember(chatId, userId);
   });
   
   bot.onText(/\/unban (\d+)/, (msg, match) => {
     const chatId = msg.chat.id;
     const userId = match[1];
     bot.unbanChatMember(chatId, userId);
   });
   