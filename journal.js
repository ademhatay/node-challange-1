const fs = require('fs');
const path = require('path');

const ENTRIES_DIR = 'entries';

class Journal {
    /**
     * Creates a new Journal instance.
     * @param {string} content - The content of the journal entry.
     */
    constructor(content) {
        this.date = new Date();
        this.content = content;
    }

    /**
     * Generates a formatted filename based on the current date and time.
     * Example: 2025-05-17_194530.txt
     * @private
     * @returns {string} The formatted filename.
     */
    _getFormattedFilename() {
        const d = this.date;
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day}_${hours}${minutes}${seconds}.txt`;
    }

    /**
     * Adds a new journal entry.
     * Saves the entry to the 'entries' directory with date and time information.
     */
    add() {
        if (!fs.existsSync(ENTRIES_DIR)) {
            try {
                fs.mkdirSync(ENTRIES_DIR);
                console.log(`Directory '${ENTRIES_DIR}' created.`);
            } catch (err) {
                console.error(`Error: Could not create directory '${ENTRIES_DIR}':`, err.message);
                return;
            }
        }

        const filename = this._getFormattedFilename();
        const filePath = path.join(ENTRIES_DIR, filename);

        const fileContent = `Date: ${this.date.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'medium' })}\n---\n${this.content}`;

        try {
            fs.writeFileSync(filePath, fileContent);
            console.log(`Journal entry added successfully: ${filename}`);
        } catch (err) {
            console.error(`Error: Could not write journal file ('${filename}'):`, err.message);
        }
    }
}

/**
 * Creates and saves a new journal entry.
 * @param {string} contentText - The text content for the new journal entry.
 */
const addEntry = (contentText) => {
    if (!contentText || contentText.trim() === "") {
        console.log("Error: Content for the entry cannot be empty.");
        console.log("Usage: node journal.js add \"your journal text here\"");
        return;
    }
    const newEntry = new Journal(contentText);
    newEntry.add();
};

/**
 * Lists all journal files in the 'entries' directory.
 */
const listEntries = () => {
    if (!fs.existsSync(ENTRIES_DIR)) {
        console.log(`Directory '${ENTRIES_DIR}' not found or no entries yet.`);
        return;
    }

    try {
        const files = fs.readdirSync(ENTRIES_DIR);
        const txtFiles = files.filter(file => path.extname(file).toLowerCase() === ".txt");

        if (txtFiles.length === 0) {
            console.log("No journal entries found yet.");
            return;
        }

        console.log("\n--- Your Journal Entries ---");
        txtFiles.forEach(file => {
            console.log(`- ${file}`);
        });
        console.log("--------------------------\n");
    } catch (err) {
        console.error(`Error: Could not list journal entries:`, err.message);
    }
};

/**
 * Reads and displays the content of a specified journal file.
 * @param {string} filename - The name of the file to read.
 */
const readEntry = (filename) => {
    if (!filename) {
        console.log("Error: Filename to read was not specified.");
        console.log("Usage: node journal.js read \"filename.txt\"");
        return;
    }

    const filePath = path.join(ENTRIES_DIR, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`Error: File '${filename}' not found in directory '${ENTRIES_DIR}'.`);
        return;
    }

    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        console.log(`\n--- Content of ${filename} ---`);
        console.log(content);
        console.log("----------------------------\n");
    } catch (err) {
        console.error(`Error: Could not read file '${filename}':`, err.message);
    }
};

/**
 * Deletes a specified journal file.
 * @param {string} filename - The name of the file to delete.
 */
const deleteEntry = (filename) => {
    if (!filename) {
        console.log("Error: Filename to delete was not specified.");
        console.log("Usage: node journal.js delete \"filename.txt\"");
        return;
    }

    const filePath = path.join(ENTRIES_DIR, filename);

    if (!fs.existsSync(filePath)) {
        console.log(`Error: File '${filename}' not found in directory '${ENTRIES_DIR}'.`);
        return;
    }

    try {
        fs.unlinkSync(filePath);
        console.log(`File '${filename}' deleted successfully.`);
    } catch (err) {
        console.error(`Error: Could not delete file '${filename}':`, err.message);
    }
};

/**
 * Displays usage instructions for the CLI journal.
 */
const printHelp = () => {
    console.log("\nCommand-Line Journal Usage:");
    console.log("------------------------------------");
    console.log("  node journal.js add \"Your journal text here.\"   -> Adds a new journal entry.");
    console.log("  node journal.js list                            -> Lists all journal entries.");
    console.log("  node journal.js read \"filename.txt\"             -> Reads a specified journal entry.");
    console.log("  node journal.js delete \"filename.txt\"           -> Deletes a specified journal entry.");
    console.log("  node journal.js help                            -> Shows this help message.");
    console.log("------------------------------------\n");
}


/**
 * Main function. Parses command-line arguments and calls the appropriate functions.
 */
const main = () => {
    const args = process.argv.slice(2);
    const command = args[0];

    if (!command || command === 'help') {
        printHelp();
        return;
    }

    switch (command) {
        case 'add':
            const contentText = args.slice(1).join(' ');
            addEntry(contentText);
            break;
        case 'list':
            listEntries();
            break;
        case 'read':
            const fileToRead = args[1];
            readEntry(fileToRead);
            break;
        case 'delete':
            const fileToDelete = args[1];
            deleteEntry(fileToDelete);
            break;
        default:
            console.log(`Unknown command: '${command}'`);
            printHelp();
    }
};

main();
