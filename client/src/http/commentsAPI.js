import React, { useState, useEffect } from 'react';
import styles from './comments.module.css';
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import DOMPurify from 'dompurify';
import ReCAPTCHA from 'react-google-recaptcha';
import Form from 'react-bootstrap/Form';
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./comments.module.css"

const NewCommentFetch = async ({ reply, username, email, text }) => {
  try {
    if(reply === null) {reply = 0}
    const response = await fetch("http://localhost:5000/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parantId: reply, username: username, email: email, text: text }),
    });
    const data = await response.json();
    console.log(data);
    
  } catch (error) {
    console.error(error);
  }
};


export const CommentForm = () => {
//for captcha 
const [captchaToken, setCaptchaToken] = useState('');
  //for view
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [reply, setReply] = useState(null);
  const [sortBy, setSortBy] = useState('dateAsc');

  //for input
  const [parantId, setParantId] = useState(null);
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [file, setFile] = useState(null);

  //for pagination
  const PAGE_SIZE = 25;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/comments")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);



    

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (reply === null)
      {
        setReply(0)
        if(file !== null){
          const formData = new FormData();
          formData.append("myFile", file);
          await NewCommentFetch({ reply, username, email, text, formData });
        }else{
          await NewCommentFetch({ reply, username, email, text });
        }
      }else {
        await NewCommentFetch({ reply, username, email, text });
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };


  const handleChange = (e) => {
    const value = DOMPurify.sanitize(e.target.value);
    setText(value);
  }


  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  function renderReplies(items, replyId) {
    const replies = items.filter((item) => item.parantId === replyId);
    if (replies.length === 0) {
      return null;
    }
    return (
      <div style={{ marginLeft: '100px' }}>
  {replies.map((reply) => (
    <div key={reply.id}>
      <img className="avatar" src="https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-avatar-male-icon-design-vector-png-image_316040.jpg" alt="" style={{ width: "50px", height: "50px", borderRadius: "50%", border: "3px solid black", marginRight: "20px" }} />
      <h5 style={{ display: "inline-block", marginLeft: "10px" }}>{reply.username}</h5>
      <p style={{ display: "inline-block", marginLeft: "10px" }}>{reply.createdAt}</p>
      <button style={{ display: "inline-block", marginLeft: "10px" }} onClick={() => setReply(reply.id)}>Reply</button>
      <p style={{ marginTop: "10px" }}>{reply.text}</p>
      <br />
      
      
      {renderReplies(items, reply.id)}
    </div>
  ))}
</div>
    );
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const comments = items.filter((item) => item.parantId === 0); // Отфильтруем только комментарии верхнего уровня (у которых parantId = 0)

    let sortedComments = [...comments]; // делаем копию массива, чтобы не изменять его напрямую

    switch (sortBy) {
      case 'dateAsc':
        sortedComments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'dateDesc':
        sortedComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'usernameAsc':
        sortedComments.sort((a, b) => a.username.localeCompare(b.username));
        break;
      case 'usernameDesc':
        sortedComments.sort((a, b) => b.username.localeCompare(a.username));
        break;
      case 'emailAsc':
        sortedComments.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case 'emailDesc':
        sortedComments.sort((a, b) => b.email.localeCompare(a.email));
        break;
      default:
        break;
    }

  const totalPages = Math.ceil(sortedComments.length / PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE;
  const endIdx = startIdx + PAGE_SIZE;
  const displayedItems = sortedComments.slice(startIdx, endIdx);
  
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };


  if (error) {
    return <p>Error {error.message}</p>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    

    return (    
      <>
        <button onClick={() => setReply(0)} style={{marginTop:'30px', marginBottom:'30px'}}>Add comment</button>
        
        <Form.Select size="sm" onChange={handleSortChange} value={sortBy}>
        <option value="dateDesc">Sort by date 1 to 10</option>
        <option value="dateAsc" >Sort by date 10 to 1</option>
        <option value="usernameAsc">User name a to z</option>
        <option value="usernameDesc">User name z to a</option>
        <option value="emailAsc">Email a to z</option>
        <option value="emailDesc">Email z to a</option>
        </Form.Select>

        <Accordion>
          {displayedItems.map((comment) => (
            <Accordion.Item key={comment.id} eventKey={comment.id}>
              <Accordion.Header >
                
                <div>
                  <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/4756/4756638.png" alt="" style={{ width: "50px", height: "50px", borderRadius: "50%", border: "3px solid black", marginRight: "20px" }} />
                  <div style={{ display: "inline-block", verticalAlign: "top" }}>
                  <h5 style={{ marginLeft: "10px" }}>{comment.username}</h5>
                  <p style={{ marginLeft: "10px" }}>{comment.createdAt}</p>
                  <p style={{ marginLeft: "10px", marginBottom: 0 }}>{comment.text}</p>
                  </div>
                  <button style={{float: "right", marginLeft: "10px" }} onClick={() => setReply(comment.id)}>Reply</button>
                </div>
              </Accordion.Header>
              <Accordion.Body>
              {renderReplies(items, comment.id)}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      
       <p>{reply === 0 || reply === null ? "Leave a comment" : `Reply to comment ${reply}`}</p>
       
      <div className="form-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isSubmitted ? (
        <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Your comment has been saved.</p>
      ) : (
        <form onSubmit={handleSubmit}>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="username" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Your Name:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%", maxWidth: "30rem" }}
              required
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%", maxWidth: "30rem" }}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="text" style={{ display: "block", fontWeight: "bold", marginBottom: "0.5rem" }}>Your Comment:</label>
            <textarea
              id="text"
              value={text}
              onChange={handleChange}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc", width: "100%", height: "10rem", maxWidth: "40rem" }}
              required
              
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>Want add some file?</p>
            <input type="file" id="file" name="myFile" onChange={handleFileChange} />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p>Want add avatar pic?</p>
            <input type="file" name="myFile" ></input>
          </div>
          <button type="submit" onClick={console.log('submit')} style={{marginBottom:'20px'}} >Submit</button>
          
        </form>
      )}
      </div>
        <form method="post" enctype="multipart/form-data" action="https://localhost/api/file">
        <input type="files" name="files"></input>
        <button type="submit">Upload</button>
        </form>
      </>
    );
  }//<ReCAPTCHA sitekey="6LdqyB0lAAAAAOXNubSffQkIk5nQHyWuHsFMe-cH" onChange={handleCaptchaChange} />
};

