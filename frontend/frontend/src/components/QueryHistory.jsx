import InboxIcon from "@mui/icons-material/Inbox";
import HistoryIcon from "@mui/icons-material/History";
import {
    Typography,
    List,
    ListItemButton,
    ListItemText,
    Divider, 
    Box
} from "@mui/material";

function QueryHistory({
    history,
    setQuestion,
    setSql,
    setResult
}) {

    return (

        <>

            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <HistoryIcon />
                Query History
            </Typography>            

            {
                history.length === 0 ? (

                    <Box
                        sx={{textAlign:"center"}}
                        mt={4}
                    >
                        <InboxIcon
                            sx={{
                                fontSize: 50,
                                color: "gray"
                            }}
                        />

                        <Typography color="text.secondary">
                            No queries executed yet.
                        </Typography>
                    </Box>

                ) : (

                    <List>

                        {

                            history.map((item, index) => (

                                <div key={index}>

                                    <ListItemButton

                                        onClick={() => {

                                            setQuestion(item.question);
                                            setSql(item.sql);
                                            setResult(item.result);

                                        }}

                                    >

                                        <ListItemText

                                            primary={item.question}

                                            secondary={item.time}

                                        />

                                    </ListItemButton>

                                    <Divider />

                                </div>

                            ))

                        }

                    </List>

                )

            }

        </>

    );

}

export default QueryHistory;