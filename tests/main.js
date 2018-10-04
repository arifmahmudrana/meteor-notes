import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import './api/notes.test';
import './ui/PrivateHeader.test';
import './ui/LogIn.tests';
import './ui/SignUp.tests';
import './ui/NoteListItem.tests';
import './ui/NoteListHeader.tests';
import './ui/NoteList.tests';
import './ui/Editor.tests';
