import { putNewList, registration } from '../../../axios/list';
import addList from '../../../business/list/addList';

const createFirstTimedata = async (email: string, id: any) => {
  //save user
  localStorage.setItem('userId', id);
  localStorage.setItem('email', email);

  // Temp Flag for detrmine it's first time user sessin
  //? Needs for bilding first time data
  // After first data bilds this LS Item will be delted forever
  localStorage.setItem('registration', 'true');

  // List
  // const phrasalVerbs: string = 'phrasalVerbs';
  // DB
  // putNewList(phrasalVerbs);
  // LS
  //   addList(phrasalVerbs);

  // Words
};
export default createFirstTimedata;
