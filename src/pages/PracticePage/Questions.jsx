

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TagFilter from '../../components/TagFilter/TagFilter';
import Pagination from '../../components/Pagination/Pagination';
import './Questions.css';

const Questions = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const questionsPerPage = 40; // Number of questions to display per page

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/problems?limit=${20}`);
        const data = await response.json();
        setProblems(data.problemsetQuestionList);
      } catch (error) {
        setError('Failed to fetch problems');
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  // Calculate index of the last question to display on the current page
  const indexOfLastQuestion = currentPage * questionsPerPage;
  // Calculate index of the first question to display on the current page
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  
  // Filter questions based on selected tags
  const filteredProblems = problems.filter(problem =>
    selectedTags.length === 0 ||
    problem.topicTags.some(tag => selectedTags.includes(tag.name))
  );

  // Slice the filtered problems array to get the questions for the current page
  const currentQuestions = filteredProblems.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const allTags = [...new Set(problems.flatMap(problem => problem.topicTags.map(tag => tag.name)))];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTagChange = (tag) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter(t => t !== tag)
        : [...prevSelectedTags, tag]
    );
    setCurrentPage(1);
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const totalPages = Math.ceil(filteredProblems.length / questionsPerPage);
  

  return (
    <>
    <div className="questions-list">
      {/* Tag Filter Checkboxes */}
      <TagFilter tags={allTags} selectedTags={selectedTags} onTagChange={handleTagChange} />
      


      {currentQuestions.map((problem, index) => (
        <div key={index} className="question-item">
          <Link to={`/practice/${problem.titleSlug}`} >
            {problem.title}
          </Link>
          
            <div className="tags">
              
                {problem.topicTags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag.name}</span>
                ))}
              
              
           </div>
          
          
        </div>
      ))}

      {/* Pagination Controls */}
      
      
    </div>
    <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
  </>
  );
};

export default Questions;
