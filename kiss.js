const { Client, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")


module.exports = {
    name: "kiss",
    description: "Kiss a member",
    category: "Fun",
    options: [
        {
            name: "user",
            description: "Mention a member.",
            type: 6,
            required: true,
        },
        {
            name: "love-declaration",
            description: "make a declaration of love.",
            type: 3,
            required: false,
        },
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    run: async(client, interaction) => {

        let user = interaction.options.getUser('user')
        let declaration = interaction.options.getString('love-declaration');

        var lista1 = [
            'https://imgur.com/II1bakc.gif',
            'https://imgur.com/MzAjNdv.gif',
            'https://imgur.com/eKcWCgS.gif',
            'https://imgur.com/3aX4Qq2.gif',
            'https://imgur.com/uobBW9K.gif'
        ];

        var lista2 = [
            'https://imgur.com/3jzT5g6.gif',
            'https://imgur.com/VrETTlv.gif',
            'https://imgur.com/FozOXkB.gif',
            'https://imgur.com/7GhTplD.gif',
            'https://imgur.com/B6UKulT.gif'
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        const embed = new EmbedBuilder()
            .setDescription(`**${interaction.user} Gave a kiss to ${user} \n\n ${declaration || `💞`}.**`)
            .setImage(`${random1}`)
            .setColor("#c5a0c1")

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('beijar')
                    .setLabel('Give back')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(false)

            )

        const embed1 = new EmbedBuilder()
            .setDescription(`**${user} Returned the kiss from ${interaction.user}.**`)
            .setColor("#c5a0c1")
            .setImage(`${random2}`)

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {
            const filter = i => i.customId === 'beijar' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === 'beijar') {
                    i.reply({ embeds: [embed1] })
                }
            });
        })

    }
}