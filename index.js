const { Client, Intents } = require('discord.js');
require('dotenv').config();
const { spawn } = require('child_process');
const { decode } = require('iconv-lite');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

// This BOT's ID
const BOT_ID = process.env.BOT_ID;

const COMMAND = {
    ping: 'ping',
    sudo: 'sudo'
}

client.once('ready', () => {
    console.log('Ready!');
});

// client is an instance of Discord.Client
client.on('messageCreate', message => {
    console.log('PIPO --message is comming!');

    if (message.author != BOT_ID && message.content == '!ping') {
        message.channel.send('pong!');

        let execute = spawn('ping google.com', { shell: true });

        execute.stdout.on('data', (data) => {
            message.channel.send(decode(data, 'ms932'));
        });
    }

    // pingコマンド スペースで区切り,配列の中にコマンドが入っているか判定 コマンドが先頭にあるか確認
    if (message.author != BOT_ID && message.content.split(' ').includes(COMMAND.ping) && message.content.split(' ').indexOf(COMMAND.ping) == 0) {
        // スペースで配列に分割,pingをフィルターにかける
        // let command = message.content.split(' ').filter(str => !str.includes('ping'));

        // スペースで配列に分割し,配列1番から最後までを切り出し
        let commandOptions = message.content.split(' ').slice(1);
        console.log(commandOptions);

        // コマンドの実行 フィルターにかけた文字列を結合
        let execute = spawn(COMMAND.ping + ' ' + commandOptions.join(" "), { shell: true });

        execute.stdout.on('data', (data) => {
            message.channel.send(decode(data, 'ms932'))
        });
        execute.stderr.on('data', (data) => {
            message.channel.send(decode(data, 'ms932'))
        });
    }

    if (message.author != BOT_ID && message.content.split(' ').includes(COMMAND.sudo) && message.content.split(' ').indexOf(COMMAND.sudo) == 0) {
        message.channel.send('We trust you have received the usual lecture from the local System\nAdministrator. It usually boils down to these three things:\n\n    #1) Respect the privacy of others.\n    #2) Think before you type.\n    #3) With great power comes great responsibility.');
        setTimeout(() => {
            message.channel.send(message.author.username + ' is not in the sudoers file.  This incident will be reported.');
        }, 1000);
    }
});



client.login(process.env.CLIENT_TOKEN);