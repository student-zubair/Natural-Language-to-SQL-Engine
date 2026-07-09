import {toast} from 'react-toastify';
import {
    Button,
    Typography,
    TextField,
    LinearProgress
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

import API from "../services/api";

function SQLBox({

question,
sql,
setSql,
setResult,
history,
setHistory, 
loading,
setLoading

}){

async function execute() {

    setLoading(true);

    try {

        const res = await API.post("/execute", {
            sql
        });

        setResult(res.data);

        // Save query history
        setHistory(prev => [
            {
                question,
                sql,
                result: res.data,
                time: new Date().toLocaleTimeString()
            },
            ...prev
        ]);

        toast.success("Query executed successfully!");

    } catch (err) {
        toast.error("Failed to execute query: " + err.message);

    } finally {

        setLoading(false);
    }

}

return(

<>

<Typography
    variant="h5"
    gutterBottom
    sx={{
        display: "flex",
        alignItems: "center",
        gap: 1
    }}
>
    <CodeIcon />
    Generated SQL
</Typography>

{loading && (
    <LinearProgress sx={{ mb: 2 }} />
)}

<TextField

multiline

rows={10}

fullWidth

value={sql}

onChange={(e)=>setSql(e.target.value)}

/>

<br/><br/>

<Button

variant="contained"

onClick={execute}

>

Run Query

</Button>

</>

);

}

export default SQLBox;