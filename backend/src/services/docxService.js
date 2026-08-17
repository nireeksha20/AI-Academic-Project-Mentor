import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  PageBreak,
  Footer,
  PageNumber,
  BorderStyle,
} from "docx";

/* =========================================================
   TEXT CLEANING
========================================================= */

function cleanText(text = "") {
  return (
    String(text)
      // Bold markdown
      .replace(/\*\*(.*?)\*\*/g, "$1")

      // Italic markdown
      .replace(/(?<!\*)\*(?!\*)(.*?)\*(?!\*)/g, "$1")

      // Markdown headings
      .replace(/^#{1,6}\s*/gm, "")

      // Code fences
      .replace(/```[\w-]*\n?/g, "")

      // Inline backticks
      .replace(/`([^`]+)`/g, "$1")

      // Windows line endings
      .replace(/\r\n/g, "\n")

      // Remove trailing spaces
      .replace(/[ \t]+$/gm, "")

      .trim()
  );
}

/* =========================================================
   DOCUMENT HEADINGS
========================================================= */

const ACADEMIC_HEADINGS = [
  "Project Title",
  "Abstract",
  "Introduction",
  "Problem Statement",
  "Objectives",
  "Existing System",
  "Limitations of Existing System",
  "Proposed System",
  "Key Features",
  "Scope",
  "Scope of the Project",
  "Functional Requirements",
  "Non-Functional Requirements",
  "Technology Stack",
  "System Architecture",
  "Software Architecture",
  "Database Design",
  "Module Description",
  "API Overview",
  "Implementation Methodology",
  "Development Approach",
  "Data Acquisition and Preprocessing",
  "Model Development and Transfer Learning",
  "Model Training and Evaluation",
  "Frontend Implementation",
  "Backend Implementation",
  "System Integration",
  "Testing Strategy",
  "Deployment Strategy",
  "Security and Reliability Considerations",
  "Risk Mitigation",
  "Risk Summary",
  "Agile Sprint Summary",
  "GitHub Repository Structure",
  "Installation Guide",
  "User Guide",
  "Maintenance Guide",
  "Expected Outcome",
  "Future Enhancements",
  "Future Scope",
  "Conclusion",
  "References",
  "Appendix",

  // Progress Report
  "Reporting Period",
  "Project Status",
  "Work Completed",
  "Features and Components Implemented",
  "Current Stage vs Planned Timeline",
  "Progress Metrics",
  "Pending Tasks",
  "Blockers and Challenges",
  "Blockers / Risks Encountered",
  "Risks Encountered",
  "Solutions and Mitigation",
  "Revised Timeline",
  "Next Steps",
];

/* =========================================================
   HEADING DETECTION
========================================================= */

function isHeading(line) {
  const trimmed = line.trim();

  if (!trimmed) {
    return false;
  }

  // Numbered heading:
  // 1. Abstract
  // 2. Problem Statement
  // 10. Functional Requirements
  if (/^\d+\.\s+[A-Za-z]/.test(trimmed)) {
    return true;
  }

  return ACADEMIC_HEADINGS.some((heading) => {
    return (
      trimmed === heading ||
      trimmed.endsWith(` ${heading}`) ||
      trimmed.endsWith(`. ${heading}`)
    );
  });
}

/* =========================================================
   REMOVE NUMBERING FROM HEADINGS
========================================================= */

function stripNumbering(line) {
  return line.replace(/^\d+\.\s+/, "").trim();
}

/* =========================================================
   CONTENT PARAGRAPH
========================================================= */

function createContentParagraph(line) {
  const cleaned = cleanText(line);

  if (!cleaned) {
    return null;
  }

  /* -------------------------
     Bullet point
  ------------------------- */

  if (/^[-•]\s+/.test(cleaned)) {
    return new Paragraph({
      text: cleaned.replace(/^[-•]\s+/, ""),
      bullet: {
        level: 0,
      },
      spacing: {
        before: 60,
        after: 120,
      },
      indent: {
        left: 720,
        hanging: 360,
      },
    });
  }

  /* -------------------------
     Numbered list
  ------------------------- */

  if (/^\d+\)\s+/.test(cleaned)) {
    return new Paragraph({
      text: cleaned.replace(/^\d+\)\s+/, ""),
      numbering: {
        reference: "academic-numbering",
        level: 0,
      },
      spacing: {
        before: 60,
        after: 120,
      },
    });
  }

  /* -------------------------
     Normal paragraph
  ------------------------- */

  return new Paragraph({
    children: [
      new TextRun({
        text: cleaned,
        size: 22,
        font: "Times New Roman",
      }),
    ],

    alignment: AlignmentType.JUSTIFIED,

    spacing: {
      before: 0,
      after: 180,
      line: 360,
    },
  });
}

/* =========================================================
   COVER PAGE
========================================================= */

function createCoverPage({
  projectTitle,
  studentName,
  institutionName,
  departmentName,
  documentTitle,
  degree,
  academicYear,
}) {
  const children = [];

  /* -----------------------------------------
     Top institution name
  ----------------------------------------- */

  children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 500,
        after: 100,
      },

      children: [
        new TextRun({
          text: institutionName || "Institution Name",
          bold: true,
          size: 32,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Institution location
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        after: 80,
      },

      children: [
        new TextRun({
          text: "HASSAN, KARNATAKA",
          bold: true,
          size: 20,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Department
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 120,
        after: 300,
      },

      children: [
        new TextRun({
          text: departmentName || "Department",
          bold: true,
          size: 24,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Horizontal divider
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      border: {
        bottom: {
          color: "000000",
          style: BorderStyle.SINGLE,
          size: 8,
        },
      },

      spacing: {
        after: 600,
      },

      children: [
        new TextRun({
          text: " ",
          size: 2,
        }),
      ],
    }),

    /* -----------------------------------------
       DOCUMENT TYPE
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 300,
        after: 250,
      },

      children: [
        new TextRun({
          text: documentTitle,
          bold: true,
          size: 34,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       ON
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        after: 250,
      },

      children: [
        new TextRun({
          text: "ON",
          bold: true,
          size: 22,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       PROJECT TITLE
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 100,
        after: 700,
      },

      children: [
        new TextRun({
          text: projectTitle || "Project Title",
          bold: true,
          size: 30,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Submitted by
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 200,
        after: 180,
      },

      children: [
        new TextRun({
          text: "Submitted by",
          bold: true,
          size: 22,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Student name
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        after: 120,
      },

      children: [
        new TextRun({
          text: studentName || "Student Name",
          bold: true,
          size: 26,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Degree
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        after: 80,
      },

      children: [
        new TextRun({
          text: degree || "Bachelor of Engineering (B.E.)",
          size: 22,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Department
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        after: 80,
      },

      children: [
        new TextRun({
          text: departmentName || "",
          size: 22,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Academic year
    ----------------------------------------- */

    new Paragraph({
      alignment: AlignmentType.CENTER,

      spacing: {
        before: 450,
        after: 0,
      },

      children: [
        new TextRun({
          text: academicYear || "",
          bold: true,
          size: 22,
          font: "Times New Roman",
        }),
      ],
    }),

    /* -----------------------------------------
       Page break
    ----------------------------------------- */

    new Paragraph({
      children: [new PageBreak()],
    }),
  );

  return children;
}

/* =========================================================
   FOOTER
========================================================= */

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,

        children: [
          new TextRun({
            text: "AI Academic Project Mentor  |  Page ",
            size: 18,
            font: "Times New Roman",
          }),

          new TextRun({
            children: [PageNumber.CURRENT],
            size: 18,
            font: "Times New Roman",
          }),
        ],
      }),
    ],
  });
}

/* =========================================================
   MAIN DOCX GENERATOR
========================================================= */

export async function createDocumentationDocx({
  content,
  projectTitle,
  studentName,
  institutionName,
  departmentName,
  docType,

  // Optional values from user profile
  degree = "Bachelor of Engineering (B.E.)",
  academicYear = "",
}) {
  const safeContent = cleanText(content);

  /* -----------------------------------------
     Document titles
  ----------------------------------------- */

  const documentTypeLabels = {
    synopsis: "PROJECT SYNOPSIS",

    methodology: "PROJECT METHODOLOGY",

    progress_report: "PROJECT PROGRESS REPORT",
  };

  const documentTitle = documentTypeLabels[docType] || "PROJECT DOCUMENT";

  /* -----------------------------------------
     Document children
  ----------------------------------------- */

  const children = [];

  /* -----------------------------------------
     COVER PAGE
  ----------------------------------------- */

  children.push(
    ...createCoverPage({
      projectTitle,
      studentName,
      institutionName,
      departmentName,
      documentTitle,
      degree,
      academicYear,
    }),
  );

  /* -----------------------------------------
     AI GENERATED CONTENT
  ----------------------------------------- */

  const lines = safeContent.split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      continue;
    }

    /* -----------------------------------------
       Heading
    ----------------------------------------- */

    if (isHeading(line)) {
      const headingText = stripNumbering(line);

      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_1,

          spacing: {
            before: 300,
            after: 180,
          },

          keepNext: true,

          children: [
            new TextRun({
              text: headingText,
              bold: true,
              size: 26,
              font: "Times New Roman",
            }),
          ],
        }),
      );

      continue;
    }

    /* -----------------------------------------
       Normal paragraph / bullet
    ----------------------------------------- */

    const paragraph = createContentParagraph(line);

    if (paragraph) {
      children.push(paragraph);
    }
  }

  /* -----------------------------------------
     DOCUMENT
  ----------------------------------------- */

  const doc = new Document({
    creator: studentName || "AI Academic Project Mentor",

    title: projectTitle ? `${projectTitle} - ${documentTitle}` : documentTitle,

    subject: documentTitle,

    description: `Academic ${docType || "project"} document generated by AI Academic Project Mentor.`,

    /* -----------------------------------------
       Numbered lists
    ----------------------------------------- */

    numbering: {
      config: [
        {
          reference: "academic-numbering",

          levels: [
            {
              level: 0,

              format: "decimal",

              text: "%1.",

              alignment: AlignmentType.LEFT,

              style: {
                paragraph: {
                  indent: {
                    left: 720,
                    hanging: 360,
                  },
                },
              },
            },
          ],
        },
      ],
    },

    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              bottom: 1000,
              left: 1200,
              right: 1200,
            },
          },
        },

        /* -------------------------------------
           Footer
        ------------------------------------- */

        footers: {
          default: createFooter(),
        },

        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
}
