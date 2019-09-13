/*jshint esversion: 6 */

const monthTrigrams = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function processMonthTrigrams(line) {
  for (var i = 0; i < monthTrigrams.length; i++) {
    const subStr = `-${monthTrigrams[i]}-`;
    const index = line.indexOf(subStr);
    if (index > 0) {
      return line.replace(subStr, `-${String(i + 1).padStart(2, "0")}-`);
    }
  }
  return line;
}

function reformat(line) {
  return line.replace(
    /^(\d{2})-(\d{2})-(\d{4})\s+(\d\d:\d\d [AP]M)\s+(\d+) mmHg\s+(\d+) mmHg\s+(\d+) bpm.*$/,
    "$2/$1/$3 $4\t$5\t$6\t$7"
  );
}

const clipboardy = require("clipboardy");

const input = clipboardy.readSync();

const eol = input.includes("\r\n") ? "\r\n" : "\n";

const lines = input
  .split(eol)
  .reverse()
  .map(processMonthTrigrams)
  .map(reformat);

clipboardy.writeSync(lines.join(eol));
