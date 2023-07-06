import { useReducer, useState } from "react";
import { db } from "../firebaseInit";
import { collection, doc, getDocs, setDoc, onSnapshot, getFirestore, deleteDoc } from 'firebase/firestore';
import { useEffect } from "react";


//Blogging App using Hooks

function blogsReducer(state, action) {
    console.log(state, "10");
    switch (action.type) {
        case 'SHOW':
            return action.blogs
        case "ADD":
            return [action.blog, ...state]
        case "REMOVE":
            return state.filter((blog, index) => index !== action.index)

        default:
            return [];
    }

}


export default function Blog() {

    const [formData, setFormData] = useState({ title: "", content: "" })
    // const[blogs ,setBlogs] = useState([]);
    const [blogs, dispatch] = useReducer(blogsReducer, []);
    const db = getFirestore();



    useEffect(() => {
        // async function fetchData(){
        //     const snapShot = await getDocs(collection(db , "blogs"))
        //     console.log(snapShot , "32");
        //   const blogs =  snapShot.docs.map((item) =>{
        //     return{
        //         id : item.id,
        //         ...item.data()
        //     }
        //   })
        //   console.log(blogs , "39");
        // //   setBlogs(blogs)
        // dispatch({type : 'SHOW' , blogs})
        // }

        // fetchData()
        const unsub = onSnapshot(collection(db, "blogs"), (snapShot) => {
            const blogs = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            console.log(blogs);
            dispatch({ type: 'SHOW', blogs })
        })
        return () => unsub()
    }, [])

    //Passing the synthetic event as argument to stop refreshing the page on submit
    async function handleSubmit(e) {
        e.preventDefault();

        // dispatch({type : 'ADD' , blog :{title : formData.title , content : formData.content}})
        // setBlogs([...blogs,{title : formData.title , content : formData.content}])
        setFormData({ title: "", content: "" })

        const docRef = doc(collection(db, 'blogs'))
        await setDoc(docRef, {
            title: formData.title,
            content: formData.content,
            createdOn: new Date()
        })


    }

     const removeBlog = async (i) => {
        // dispatch({ type: 'REMOVE', index: i })
        const docRef = doc(db , 'blogs' , i);
        await deleteDoc(docRef)
    }

    return (
        <>
            {/* Heading of the page */}
            <h1>Write a Blog!</h1>

            {/* Division created to provide styling of section to the form */}
            <div className="section">

                {/* Form for to write the blog */}
                <form onSubmit={handleSubmit}>

                    {/* Row component to create a row for first input field */}
                    <Row label="Title">
                        <input className="input"
                            placeholder="Enter the Title of the Blog here.." value={formData.title} onChange={(e) => setFormData({ title: e.target.value, content: formData.content })} />
                    </Row >

                    {/* Row component to create a row for Text area field */}
                    <Row label="Content">
                        <textarea className="input content"
                            placeholder="Content of the Blog goes here.." value={formData.content} onChange={(e) => setFormData({ content: e.target.value, title: formData.title })} />
                    </Row >

                    {/* Button to submit the blog */}
                    <button className="btn">ADD</button>
                </form>

            </div>

            <hr />

            {/* Section where submitted blogs will be displayed */}
            <h2> Blogs </h2>
            {blogs.map((item, index) => {
                return (
                    <div key={index}>
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <button className="remove" onClick={() => removeBlog(item.id)}>Delete</button>
                    </div>
                )
            })}


        </>
    )
}

//Row component to introduce a new row section in the form
function Row(props) {
    const { label } = props;
    return (
        <>
            <label>{label}<br /></label>
            {props.children}
            <hr />
        </>
    )
}
