// studentProfiles.js
const studentProfiles = [
    {
      id: "student-001",
      name: "John Doe",
      email: "john.doe@example.com",
      notifications: true,
      enrolledCourses: [
        {
          id: "course-001",
          name: "Introduction to Programming",
          semester: "Fall 2024",
          isPublished: true,
          content: "Course overview and syllabus.",
          syllabus: "Programming basics.",
          quizzes: ["Quiz 1"],
          assignments: ["Assignment 1"],
          grades: "B+",
          announcements: ["Welcome to the course!", "First assignment due next week"]
        },
        {
          id: "course-002",
          name: "Advanced Mathematics",
          semester: "Spring 2024",
          isPublished: false,
          content: "Advanced topics in mathematics.",
          syllabus: "Calculus, linear algebra, differential equations, and complex analysis.",
          quizzes: ["Calculus Quiz", "Linear Algebra Quiz"],
          assignments: ["Homework 1", "Project 1"],
          grades: "A",
          announcements: ["Welcome to Advanced Mathematics!"]
        },
        {
          id: "course-003",
          name: "History of Art",
          semester: "Fall 2023",
          isPublished: true,
          content: "Exploration of art history from ancient to modern times.",
          syllabus: "Ancient art",
          quizzes: ["Ancient Art Quiz"],
          assignments: ["Essay on Renaissance", "Modern Art Presentation"],
          grades: "A-",
          announcements: ["Welcome to History of Art"]
        },
        {
          id: "course-004",
          name: "Modern Art and Design",
          semester: "Spring 2025",
          isPublished: true,
          content: "Understanding modern art movements and design principles.",
          syllabus: "Impressionism, Cubism, Abstract art, and Contemporary design.",
          quizzes: ["Design Principles Quiz", "Modern Art Quiz"],
          assignments: ["Museum Visit Report", "Art Movement Presentation"],
          grades: "A-",
          announcements: ["Field trip to the museum!"]
        }
      ]
    },
    {
      id: "student-002",
      name: "Sammy",
      email: "sammy@example.com",
      notifications: true,
      enrolledCourses: [
        {
          id: "course-001",
          name: "Introduction to Programming",
          semester: "Fall 2024",
          isPublished: true,
          content: "Course overview and syllabus.",
          syllabus: "Programming basics, data structures, algorithms, and problem-solving.",
          quizzes: ["Quiz 1", "Quiz 2", "Quiz 3"],
          assignments: ["Assignment 1", "Assignment 2", "Assignment 3"],
          grades: "B+",
          announcements: ["Welcome to the course!", "First assignment due next week"]
        },
        {
          id: "course-002",
          name: "Advanced Mathematics",
          semester: "Spring 2024",
          isPublished: false,
          content: "Advanced topics in mathematics.",
          syllabus: "Calculus, linear algebra, differential equations, and complex analysis.",
          quizzes: ["Calculus Quiz", "Linear Algebra Quiz"],
          assignments: ["Homework 1", "Project 1"],
          grades: "A",
          announcements: ["Welcome to Advanced Mathematics!", "Calculus Quiz next week"]
        }
      ]
    }
  ];
  
  export default studentProfiles;
  