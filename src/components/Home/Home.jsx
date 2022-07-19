import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import $, { nodeName } from 'jquery';
function Home() {
  let baseUrl = 'https://route-egypt-api.herokuapp.com/';
  // const [valueNoteForUpdate, setValueNoteForUpdate] = useState([{}])
  // const [title,setTitle]=useState('');
  // const [desc, setDesc]=useState('');
  const [allNotes, setAllNotes] = useState([]);
  const [NoteID, setNoteId] = useState('');
  const [loading, setLoading] = useState(true);
  // const [editId,setEditId]=useState('')

  const token = localStorage.getItem('token');

  if (token) {
    var decoded_token = jwt_decode(token);
  }
  const [note, setNote] = useState({
    title: '',
    desc: '',
    token,
    userID: decoded_token._id,
  });

  // console.log(note);

  async function getAllNotes() {
    let { data } = await axios.get(baseUrl + 'getUserNotes', {
      headers: {
        token,
        userID: decoded_token._id,
      },
    });
    if (data.Notes) {
      setLoading(false);
      setAllNotes(data.Notes);
    } else {
      setAllNotes([]);
      setLoading(false);
      toast.dark('You Have No Notes Yet');
    }
    // console.log(data);
  }

  useEffect(() => {
    getAllNotes();
  }, []);

  async function deleteNote() {
    let { data } = await axios.delete(baseUrl + 'deleteNote', {
      data: {
        NoteID,
        token,
      },
    });

    if (data.message === 'deleted') {
      $('#deleteNote').modal('hide');
      getAllNotes();
    }
    console.log(data);
    // console.log("done");
  }
  // async function editNote() {
  //   await axios.put(baseUrl + 'updateNote', note);
  // }
  function getId(_id) {
    setNoteId(_id);
  }

  function getNote({ target }) {
    // console.log(target.value);
    setNote({ ...note, [target.name]: target.value });

    // setValueNoteForUpdate(...valueNoteForUpdate);
  }
  // console.log(note);
  async function addNote(e) {
    e.preventDefault();
    // console.log(e.target.title.value);
    if (e.target.title.value && e.target.desc.value !== '') {
      let { data } = await axios.post(baseUrl + 'addNote', note);
      console.log(data);
      if (data.message === 'success') {
        $('#exampleModal').modal('hide');
        getAllNotes();
        // console.log(e.target.value);
        e.target.title.value = '';
        e.target.desc.value = '';
      }
    } else {
      toast.error("You Can't Add an empty Note");
    }
  }

  function editButtonHandler(value) {
    setNoteId(value._id);
    setNote({ ...note, title: value.title, desc: value.desc });
    // setValueNoteForUpdate(value);
    allNotes.filter((element) => {
      if (element.id === value.id) {
        document.getElementById('editTitle').value = value.title;
        document.getElementById('editDesc').value = value.desc;
      }
    });
    console.log(value.title);
    //element.id===value.id?document.getElementById("editTitle").value =value.title  : ''
  }

  // async function update(e) {
  //   e.preventDefault();
  //   let { data } = await axios.put(baseUrl + 'updateNote', note);
  //   console.log(data);
  //   try {
  //     if (data.message === 'success') {
  //       $('#editNoteModel').modal('hide');
  //       getAllNotes();
  //       console.log('done');
  //       e.target.title.value = '';
  //       e.target.desc.value = '';
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async function updateHandler(e) {
    e.preventDefault();
    console.log(note);
    $('#editNoteModel').modal('hide');
    toast.dark("The online API we use doesn't work with the PUT method, Don't tell anybody 🤫😅")
    // const {data} = await axios.put(baseUrl+'updateNote',note);
    // console.log(data);
    // const updatedNotes=allNotes.map((elem) => {
    //   if (NoteID === elem.id) {
    //     return [
    //       {
    //         ...elem,
    //         title: document.getElementById('editTitle').value,
    //         desc: document.getElementById('editDesc').value,
    //       },
    //     ];
    //   }
    // });
    // setAllNotes(updatedNotes);
  }
  // async function updateHandler(e) {
  //   e.preventDefault();
  //   console.log(note);
  //   allNotes.map((elem) => {
  //     if (NoteID === elem.id) {
  //       [{...elem,title:document.getElementById("editTitle").value,
  //       desc:document.getElementById("editDesc").value}]
  // if (e.target.title.value && e.target.desc.value !== '') {
  // let { data } = await axios.put(baseUrl + 'updateNote', note);
  // console.log(data);
  // try {
  //   if (data.message === 'success') {
  //     $('#editNoteModel').modal('hide');
  //     getAllNotes();
  //     // console.log(e.target.value);
  //     e.target.title.value = '';
  //     e.target.desc.value = '';
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  // } else {
  //   toast.error("You Can't Add an empty Note");
  // }
  // }
  // }
  // );

  // fetch(baseUrl+`updateNote`,{
  //   method: 'PUT',
  //   headers:{
  //     'Accept':'application/json',
  //     'Content-Type':'application/json'
  //   },
  //   body:JSON.stringify(note)
  // }).then((result)=>{
  //   result.json().then((resp)=>{
  //     console.log(resp)
  //     getAllNotes()
  //   })
  // })
  // }

  // console.log(note);
  // async function updateHandler(e){
  //   e.preventDefault()
  //   console.log(note);
  //   if (e.target.title.value && e.target.desc.value !== '') {
  //     let { data } = await axios.put(baseUrl + 'updateNote', note);
  //     console.log(data);
  //     if (data.message === 'success') {
  //       $('#editNoteModel').modal('hide');
  //       getAllNotes();
  //       // console.log(e.target.value);
  //       e.target.title.value = '';
  //       e.target.desc.value = '';
  //     }
  //   } else {
  //     toast.error("You Can't Add an empty Note");
  //   }
  // }
  return (
    <>
      <div className="container my-5">
        <ToastContainer position="top-center" limit={1} />
        <div className="col-md-12 m-auto text-right">
          <span
            className="add p-2 btn"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <i className="fas fa-plus-circle"></i> Add New
          </span>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={addNote}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  onChange={getNote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                />
                <textarea
                  onChange={getNote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-info">
                  <i className="fas fa-plus-circle"></i> Add Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        className="modal fade"
        id="editNoteModel"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={updateHandler}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  // value={title}
                  onChange={getNote}
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                  id="editTitle"
                />
                <textarea
                  // value={desc}

                  onChange={getNote}
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id="editDesc"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-info">
                  <i className="fas fa-plus-circle"></i> Update Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* ========================== Delete Model ====================== */}

      <div
        className="modal fade"
        id="deleteNote"
        // tabindex="-1" react doesn't like it
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Are You Sure?!</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={() => {
                  deleteNote();
                }}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- ==========================Notes=============================== --> */}

      <div className="container">
        <div className="row">
          {loading ? <h1 className="text-center ">Loading......</h1> : ''}
          {allNotes &&
            allNotes.map((value, index) => {
              return (
                <div key={value._id} className="col-md-4 my-4">
                  <div className="note p-4">
                    <div className="d-flex justify-content-space-between align-items-center">
                      <div className="w-75 mr-5">
                        <h3 className="float-left">{value.title} </h3>
                      </div>

                      <div className="ml-3 w-25 d-flex justify-content-between align-items-top">
                        {/* <a href="/"> */}
                        <i
                          data-toggle="modal"
                          data-target="#editNoteModel"
                          onClick={() => {
                            // getId(value._id);
                            editButtonHandler(value);
                          }}
                          className="fas fa-edit float-right edit"
                        ></i>

                        <i
                          onClick={() => {
                            getId(value._id);
                          }}
                          data-toggle="modal"
                          data-target="#deleteNote"
                          className="fas fa-trash-alt float-right del"
                        ></i>
                      </div>
                    </div>

                    <span className="clearfix"></span>
                    <p>{value.desc}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
