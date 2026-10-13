function loadContent(filename) {
  const leftColumn = document.querySelector(".left-column");
  if (!leftColumn) return;

  const request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState !== 4) return;

    if (this.status !== 200) {
      leftColumn.innerHTML = "<p>This lab resource is currently unavailable.</p>";
      return;
    }

    if (filename.endsWith(".txt")) {
      leftColumn.innerHTML = "";
      const pre = document.createElement("pre");
      pre.textContent = this.responseText;
      leftColumn.appendChild(pre);
      return;
    }

    if (filename.endsWith(".html")) {
      const parsed = new DOMParser().parseFromString(this.responseText, "text/html");
      const contentRoot = parsed.body.querySelector(".left-column") || parsed.body;
      leftColumn.innerHTML = contentRoot.innerHTML;

      // Resolve paths using the fetched file's URL before its body is displayed in Lab.html.
      const sourceUrl = new URL("LabContent/" + filename, window.location.href);
      leftColumn.querySelectorAll("[src], [href]").forEach((element) => {
        ["src", "href"].forEach((attribute) => {
          if (!element.hasAttribute(attribute)) return;
          const value = element.getAttribute(attribute);
          if (!value || value.startsWith("#") || value.startsWith("//") ||
              value.startsWith("data:") || /^[a-z][a-z0-9+.-]*:/i.test(value)) return;
          try {
            element.setAttribute(attribute, new URL(value, sourceUrl).href);
          } catch (_) {
            // Keep an invalid optional link from breaking the rest of the panel.
          }
        });
      });

      enableChemicalTableSorting(leftColumn);
      return;
    }

    if (filename.endsWith(".docx")) {
      const file = new Blob([this.response], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank", "noopener");
    }
  };

  request.open("GET", "LabContent/" + filename, true);
  if (filename.endsWith(".docx")) request.responseType = "arraybuffer";
  request.send();
}

function enableChemicalTableSorting(container) {
  const table = container.querySelector("#chemicals-table");
  if (!table || !table.tBodies.length) return;

  const headers = table.querySelectorAll("thead th, thead td");
  headers.forEach((header, columnIndex) => {
    header.style.cursor = "pointer";
    header.title = "Click to sort by " + header.textContent.trim();
    header.addEventListener("click", () => {
      const sameColumn = table.dataset.sortColumn === String(columnIndex);
      const direction = sameColumn && table.dataset.sortDirection === "asc" ? "desc" : "asc";
      const body = table.tBodies[0];
      const rows = Array.from(body.rows);

      rows.sort((a, b) => {
        const left = a.cells[columnIndex]?.textContent.trim() || "";
        const right = b.cells[columnIndex]?.textContent.trim() || "";
        const result = left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
        return direction === "asc" ? result : -result;
      });

      rows.forEach((row) => body.appendChild(row));
      table.dataset.sortColumn = String(columnIndex);
      table.dataset.sortDirection = direction;
      headers.forEach((cell, index) => {
        cell.setAttribute("aria-sort", index === columnIndex
          ? (direction === "asc" ? "ascending" : "descending")
          : "none");
      });
    });
  });
}
