// No import needed from React here
import 'react-toastify/dist/ReactToastify.css';
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {toast} from 'react-toastify';
import {
    TextField,
    CircularProgress,
    Button,
    Typography,
    LinearProgress
} from "@mui/material";


import API from "../services/api";

function QuestionInput({
    question,
    setQuestion,
    setSql,
    loading,
    setLoading
}) {

    async function generate() {
        setLoading(true);
        try {

            const res = await API.post("/generate", {
                question
            });

            setSql(res.data.sql);

            // Success toast
            toast.success("SQL generated successfully!");

        } catch (err) {

            // Error toast
            toast.error(
                err.response?.data?.detail || "Unable to generate SQL."
            );

        } finally {

            // Only if you're using loading state
            setLoading(false);

        }

    }

    return (

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
                <SmartToyIcon />
                Ask a Question

            </Typography>

            {loading && (
                <LinearProgress sx={{ mb: 2 }} />
            )}

            <TextField

                fullWidth

                label="Type your question..."

                value={question}

                onChange={(e) =>
                    setQuestion(e.target.value)
                }

            />

            <br />
            <br />

            <Button
                variant="contained"
                onClick={generate}
                disabled={loading}
            >

                {loading ? (

                    <CircularProgress
                        size={22}
                        color="inherit"
                    />

                ) : (

                    "Generate SQL"

                )}

            </Button>
            

        </>

    );

}

export default QuestionInput;