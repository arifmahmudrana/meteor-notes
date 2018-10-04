import React from "react";
import PrivateHeader from './PrivateHeader';
import NoteList from "./NoteList";
import Editor from './Editor';

const App = (props) => {
  const id = props.match.params.id;
  return (
    <div>
      <PrivateHeader title="Dashboard" />
      <div className="wrapper wrapper--content">
        <div className="wrapper__sidebar">
          <NoteList selected={id} />
        </div>
        <div className="wrapper__main">
          <Editor selected={id} />
        </div>
      </div>
    </div>
  );
}

export default App;
