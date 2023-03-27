const clearTerminal = () => {
  process.stdout.write(
    process.platform === "darwin" ? "\x1B[2J\x1B[3J\x1B[H" : "\x1B[2J\x1B[0f"
  );
};

module.exports = {
  clearTerminal,
};
