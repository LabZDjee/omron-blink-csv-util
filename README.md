# Omron Bi-Link Export Utility

Data retrieved from Omron blood pressure monitors on personal accounts stored on their website Bi-LINK (https://bi-link.omron.com) does not lean to my tools for processing those data

For further processing to XLS (averaging, charts) expected CSV format is simply:

- `mm/dd mm:ss xM\tSP\tDp\tHB`

with `xM` being AM or PM, `SP` systolic pressure figures, `DP` diastolic pressure figures, and `HB` heart beat figures

Before September 2019, XLS export could be processed with a rather find and replace with captures of a long regular expression, what could be done with a text editor

From September 2019, the new format of XLS exports is simpler for humans. It is however awful for data processing: basically all is text instead of digits, data are flipped (from more recent to older, not like before). This made processing from an even advanced text processor next to impossible.

So I decided to write a simple utility in Node.js to get the clipboard, process it and copy back into the clipboard

Access to the clipboard was possible (and *easy peasy*) thanks to *clipboardy* NMP package: https://github.com/sindresorhus/clipboardy

##  Usage

From Omron **Bi-LINK** / *Export Readings*, export as *xls*. Then open file downloaded on disk, select values, and copy to clipboard

Then run utility with node on a command line

Clipboard is ready in the format given above

Note: don't forget to launch `npm install` before running this utility

## Process

Simply put, here is what this utility does:

- Split clipboard contents into an array of lines
- Flip the array (first to last, etc)
- Replaces month trigrams (`Jan`, `Feb`...) with numeric values (from 01 to 12)
- Extract numeric values in captures of a regex and creates a string as wished
- Join array to string and copy to clipboard

