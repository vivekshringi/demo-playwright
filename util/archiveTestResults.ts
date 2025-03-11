import fs from "fs/promises";
import path from "path";

async function archiveTestResults() {
  const dateFormat = () => {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}_${now
      .getHours()
      .toString()
      .padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}`;
  };

  const sourceDir = path.join(__dirname, "../test-results");
  const archiveDir = path.join(__dirname, "../test-results-archive", `testrun_${dateFormat()}`);

  try {
    // Read files and directories from sourceDir
    const files = await fs.readdir(sourceDir, { withFileTypes: true });

    // Check if the directory is empty
    if (files.length === 0) {
      console.log("There is nothing to archive. The 'test-results' directory is empty.");
      return; // Exit the function as there's nothing to archive
    }

    // Create the archive directory
    await fs.mkdir(archiveDir, { recursive: true });

    // Copy files and directories
    for (const file of files) {
      const srcPath = path.join(sourceDir, file.name);
      const destPath = path.join(archiveDir, file.name);

      if (file.isDirectory()) {
        // Recursively copy directories
        await fs.cp(srcPath, destPath, { recursive: true });
      } else {
        // Copy files
        await fs.copyFile(srcPath, destPath);
      }
    }

    console.log(`Test results have been archived to: ${archiveDir}`);
  } catch (error) {
    console.error("Failed to archive test results:", error);
  }
}

archiveTestResults();

