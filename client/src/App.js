import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import {  CommentForm} from "./http/commentsAPI";
import { FileUploadForm } from "./http/file";

function App() {
  return (
    <div className="App">
      
      <FileUploadForm/>
    </div>
  );
}
//<CommentForm/>
export default App;