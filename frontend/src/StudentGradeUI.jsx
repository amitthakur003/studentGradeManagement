import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Trash2,
  FileText,
  Award,
  ChevronDown,
  Play,
  BookOpen,
  Users,
  Star,
} from "lucide-react"
import axios from 'axios';;

export default function KindergartenHeroGrades() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [grades, setGrades] = useState("");
  const [removeRoll, setRemoveRoll] = useState("");

 // Fetch students from backend
const fetchStudents = async () => {
  try {
    const res = await axios.get('http://localhost:5000/students');
    const formatted = res.data.map((s) => ({
      ...s,
      grades: s.grades.split(',').map(Number),
    }));
    setStudents(formatted);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
};

// Add student to backend
const addStudent = async (student) => {
  try {
    await axios.post('http://localhost:5000/students', student);
    fetchStudents();
    setName('');
    setRoll('');
    setGrades('');
  } catch (error) {
    console.error('Error adding student:', error);
  }
};

// Remove student from backend
const removeStudent = async (rollToRemove) => {
  try {
    await axios.delete(`http://localhost:5000/students/${rollToRemove}`);
    fetchStudents();
    setRemoveRoll('');
  } catch (error) {
    console.error('Error removing student:', error);
  }
};

// Fetch students on component mount
useEffect(() => {
  fetchStudents();
}, []);

  // Handler to add student
  const handleAdd = () => {
    const parsedGrades = grades.split(",").map((g) => parseFloat(g.trim()));
    if (!name || !roll || parsedGrades.some(isNaN)) {
      return alert("Please enter valid data.");
    }
    addStudent({ name, roll: parseInt(roll), grades: parsedGrades });
  };

  // Handler to remove student
  const handleRemove = () => {
    if (!removeRoll) return;
    removeStudent(parseInt(removeRoll));
  };

  // Calculate average grade
  const getAverage = (grades) => {
    const sum = grades.reduce((a, b) => a + b, 0);
    return (sum / grades.length).toFixed(2);
  };

  // Get highest performer based on average grades
  const getHighestStudent = () => {
    if (students.length === 0) return null;
    return students.reduce((prev, curr) => {
      const avgPrev =
        prev.grades.reduce((a, b) => a + b, 0) / prev.grades.length;
      const avgCurr =
        curr.grades.reduce((a, b) => a + b, 0) / curr.grades.length;
      return avgCurr > avgPrev ? curr : prev;
    });
  };

  const highest = getHighestStudent();

  const scrollToGrades = () => {
    document
      .getElementById("grades-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
     <section className="relative min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 overflow-visible">
        {/* Decorative clouds */}
        <div className="absolute bottom-0 left-0 right-0 ">
          <svg viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#ffffff"
              fillOpacity="0.9"
              d="m0,96l48,32c48,32 144,96 240,128c96,32 192,32 288,16c96,-16 192,-48 288,-32c96,16 192,80 240,112l48,32l0,160l-1440,0z"
            ></path>
          </svg>
        </div>

        {/* Cloud decorations */}
        <div className="absolute top-20 left-10 w-16 h-10 bg-white bg-opacity-30 rounded-full"></div>
        <div className="absolute top-32 left-20 w-12 h-8 bg-white bg-opacity-20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-12 bg-white bg-opacity-25 rounded-full"></div>
        <div className="absolute top-16 right-40 w-14 h-9 bg-white bg-opacity-30 rounded-full"></div>

        <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="text-white flex flex-col gap-8">
              {/* Tagline + Heading */}
              <div className="flex flex-col gap-2">
                <p className="text-emerald-100 text-sm font-medium tracking-widest uppercase">
                 Welcome to Your Dashboard
                </p>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Manage & Track <br />
                  <span className="text-yellow-300">Grades Seamlessly</span>
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-emerald-50 text-lg leading-relaxed max-w-md">
              A simple, powerful tool to add students, record grades, and keep performance data organized and accessible.
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-6">
                <button
                  onClick={scrollToGrades}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  View Dashboard
                </button>
                <button
                  onClick={scrollToGrades}
                  className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
                >
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors">
                    <Play
                      className="w-5 h-5 text-emerald-700 ml-1"
                      fill="currentColor"
                    />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Content - Character */}
            <div className="relative flex justify-center lg:justify-end pr-28">
              <div className="relative flex flex-col items-center -translate-y-12">
                {/* Cartoon with background */}
                <div className="relative w-80 h-96 flex items-end justify-center">
                  <div className="w-full h-80 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-full shadow-2xl"></div>
                  <img
                    src="/hero-img.png"
                    alt="Character illustration"
                    className="absolute bottom-0 w-72 object-contain translate-y-1/4"
                  />
                </div>

                {/* Optional text or buttons below */}
                {/* <p className="mt-4 text-lg font-semibold">Some text here</p> */}

                {/* Floating shapes */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
                <div className="absolute top-10 -left-6 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 -right-8 w-10 h-10 bg-purple-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <button
            onClick={scrollToGrades}
            className="text-white hover:text-yellow-300 transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white-50 ">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive tools for educational excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Easy Student Records
              </h3>
              <p className="text-gray-600">
                Add, update, and view student details with a simple, intuitive interface.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Smart Grade Tracking
              </h3>
              <p className="text-gray-600">
                Keep track of grades for every student and monitor trends over time.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Top Performer Insights
              </h3>
              <p className="text-gray-600">
                Identify top students and highlight achievements with clear performance metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Management Section */}
      <section id="grades-section" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <header className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-700 mb-4">
              Student Grade Dashboard
            </h2>
            <p className="text-gray-500 text-lg">
              Track, manage, and evaluate student performance efficiently
            </p>
          </header>

          <div className="max-w-6xl mx-auto bg-blue-50 p-8 rounded-3xl shadow-xl border border-blue-200">
            <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-3xl border border-gray-300">
              {/* Title */}
              <h3 className="text-3xl font-bold text-red-600 mb-10 flex items-center justify-center gap-3">
                <FileText className="w-6 h-6" /> Student Grade Management System
              </h3>

              {/* Add / Remove Student */}
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                {/* Add Student */}
                <div className="bg-gray-50 p-6 border border-gray-300 rounded-2xl shadow-sm">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-yellow-500" /> Add Student
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      <input
                        className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Roll Number
                      </label>
                      <input
                        className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter Roll Number"
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Grades (comma separated)
                      </label>
                      <input
                        className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        placeholder="Enter Grades"
                        value={grades}
                        onChange={(e) => setGrades(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-md font-medium mt-4"
                    onClick={handleAdd}
                  >
                    Add Student
                  </button>
                </div>

                {/* Remove Student */}
                <div className="bg-gray-50 p-6 border border-gray-300 rounded-2xl shadow-sm">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Trash2 className="w-5 h-5 text-red-500" /> Remove Student
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Roll Number
                      </label>
                      <input
                        className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                        placeholder="Enter Roll Number"
                        value={removeRoll}
                        onChange={(e) => setRemoveRoll(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="w-full bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-md font-medium mt-4"
                    onClick={handleRemove}
                  >
                    Remove Student
                  </button>
                </div>
              </div>

              {/* Student Records */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5 text-gray-700" /> Student Records
                </h4>
                {students.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">
                      No students added yet
                    </p>
                    <p className="text-gray-400 text-sm">
                      Add your first student to get started
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-300 rounded-lg overflow-hidden">
                      <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700">
                        <tr>
                          <th className="py-3 px-6 text-left font-semibold">
                            Name
                          </th>
                          <th className="py-3 px-6 text-left font-semibold">
                            Roll Number
                          </th>
                          <th className="py-3 px-6 text-left font-semibold">
                            Grades
                          </th>
                          <th className="py-3 px-6 text-left font-semibold">
                            Average
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student, index) => {
                          const avg = getAverage(student.grades);
                          const isTopper =
                            highest && student.roll === highest.roll;
                          return (
                            <tr
                              key={student.roll}
                              className={`border-b hover:bg-gray-50 transition-colors ${
                                isTopper
                                  ? "bg-green-50 border-green-200"
                                  : index % 2 === 0
                                  ? "bg-white"
                                  : "bg-gray-25"
                              }`}
                            >
                              <td className="py-4 px-6 font-medium text-gray-800">
                                {isTopper && (
                                  <Star className="inline w-4 h-4 text-yellow-500 mr-2" />
                                )}
                                {student.name}
                              </td>
                              <td className="py-4 px-6 text-gray-600">
                                {student.roll}
                              </td>
                              <td className="py-4 px-6 text-gray-600">
                                {student.grades.join(", ")}
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`font-semibold ${
                                    isTopper
                                      ? "text-green-700"
                                      : "text-gray-800"
                                  }`}
                                >
                                  {avg}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Highlight Top Performer */}
              {highest && (
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 text-green-800 px-6 py-6 rounded-2xl text-center shadow-lg">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <Award className="w-6 h-6 text-green-700" />
                    <span className="text-lg font-bold">Top Performer</span>
                  </div>
                  <p className="text-green-700">
                    <span className="font-bold text-xl">{highest.name}</span>{" "}
                    (Roll #{highest.roll})
                    <br />
                    <span className="text-sm">
                      with an outstanding average of{" "}
                    </span>
                    <span className="font-bold text-lg">
                      {getAverage(highest.grades)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Manage Student Grades Smarter?</h3>
            <p className="text-gray-400 mb-6">
              Join schools and educators streamlining student performance tracking with ease.
            </p>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Managing Grades
            </button>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} student Grade Management | Designed by Amit Thakur
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
