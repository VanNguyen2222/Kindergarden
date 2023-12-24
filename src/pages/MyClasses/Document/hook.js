import { push, ref, update } from "firebase/database";
import { useContext, useEffect, useMemo, useState } from "react";
import { useAlert } from "react-alert";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../components/AuthContext";
import { ClassesContext } from "../../../components/ClassesContext";
import { db } from "../../../firebaseConfig";

export const useData = () => {
    const [value, setValue] = useState("");
    const [docName, setDocName] = useState("");
    const location = useLocation();
    const classId = location.pathname.split("/")[2]
    const alert = useAlert();
    const classes = useContext(ClassesContext)
    const user = useContext(AuthContext)
    const navigate = useNavigate()

    const { documentId } = useParams()

    const currentClass = useMemo(() => classes.find(cClass => cClass.id === classId), [classId, classes])
    const currentDoc = useMemo(() => currentClass?.documents?.find(doc => doc.id === documentId), [currentClass, documentId])
    const isAdd = useMemo(() => !documentId, [documentId])

    console.log(currentClass)

    useEffect(() => {
        if (!isAdd)
            if (currentDoc) {
                setDocName(currentDoc.name)
                setValue(currentDoc.value)
            }
    }, [isAdd, currentDoc])


    const handleChange = (e, editor) => {
        const data = editor.getData()
        setValue(data)
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(docName, value)
        if (docName.trim().length <= 0) {
            alert.error("Please input document name")
            return
        }
        if (value.length <= 30) {
            alert.error("Please input more ducoment content")
            return
        }
        if (isAdd) {
            const refDoc = ref(db, 'classes/' + classId + '/documents')
            push(refDoc, {
                name: docName,
                value: value,
                isActive: true
            }).then(() => {
                alert.success("Add document successful!")
            }).catch(error => alert.error("Add document failed!"))
            navigate(-1)
        } else {
            const updates = {};
            updates['/classes/' + classId + '/documents/' + documentId + '/name'] = docName;
            updates['/classes/' + classId + '/documents/' + documentId + '/value'] = value;
            update(ref(db), updates)
                .then(() => {
                    alert.success("Update document successful!")
                })
                .catch((error) => {
                    alert.error("Update document failed!")
                })
                navigate(-1)
            }
    }

    return {
        states: {
            value,
            docName
        },
        handles: {
            handleChange,
            setDocName,
            handleSubmit
        },
        user
    }
}