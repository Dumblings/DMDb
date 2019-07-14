const Command = require('../helpers/command');

class FlagsCommand extends Command {
    constructor(client) {
        super(client, {
            'description': 'What flags do and how to use them.',
            'usage': false,
            'flags': ['more'],
            'visible': false,
            'restricted': false,
            'weight': 0
        });

        this.client.flags = {
            'page': { 'requiresArguments': true, 'description': 'Get more results.' },
            'year': { 'requiresArguments': true, 'description': 'Get results from a specific year.' },
            'show': { 'requiresArguments': false, 'description': 'Get a result for a TV show instead of a movie.' },
            'shows': { 'requiresArguments': false, 'description': 'Get results for TV shows instead of movies.' },
            'person': { 'requiresArguments': false, 'description': 'Get a result for a person instead of a movie.' },
            'more': { 'requiresArguments': false, 'description': 'Get more information for a result.' }
        };
    }

    async process(message) {
        // Get query
        const query = message.arguments.join(' ');

        // Advanced search
        const flags = this.util.flags(query, this.meta.flags);

        // Response
        this.embed.create(message.channel.id, {
            'title': 'Flags',
            'description': 'Flags gives you access to more options for more specific results. ' +
                'A flag start with `--` followed by the flag name and somtimes an argument after. The argument is anything ' +
                'after the flag name seperated by a space and ending by a space or nothing if it\'s the end of the command. ' +
                'You can place the flag anywhere in the query and use multiple flags if the flag hasn\'t already been used.' +
                
                (flags.more ? '\n\nList of possible flags:' : '\n\nHere are some examples:\n' +
                '`!?poster Black Mirror --show`\n`!?poster George --person Clooney`\n' +
                '`!?movies Thor --page 2 --year 2017`\n`!?credits --person George Clooney`' +
                '\n\nUse the `--more` flag with this command to get a list of flags and what they do.'),

            'fields': flags.more ? Object.keys(this.client.flags).map(flag => ({
                'name': this.capitaliseStart(flag), 'value': this.client.flags[flag].description })) : []
        });
    }
}

module.exports = FlagsCommand;
