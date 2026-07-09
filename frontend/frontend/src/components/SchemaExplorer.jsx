import StorageIcon from "@mui/icons-material/Storage";
import { useEffect, useState } from "react";

import API from "../services/api";

import {
    Paper,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    CircularProgress
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function SchemaExplorer() {

    const [schema, setSchema] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchSchema() {

            try {

                const res = await API.get("/schema");

                setSchema(res.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        }

        fetchSchema();

    }, []);

    return (

        <Paper sx={{ p:2 }}>

            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <StorageIcon />
                Schema Explorer
            </Typography>

            {loading ? (

                <CircularProgress />

            ) : (

                Object.entries(schema).map(([table, columns]) => (

                    <Accordion key={table}>

                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >

                            <Typography>

                                {table}

                            </Typography>

                        </AccordionSummary>

                        <AccordionDetails>

                            <List>

                                {columns.map(col => (

                                    <ListItem key={col}>

                                        {col}

                                    </ListItem>

                                ))}

                            </List>

                        </AccordionDetails>

                    </Accordion>

                ))

            )}

        </Paper>

    );

}

export default SchemaExplorer;