import { Typography, Box, Button } from "@mui/material";
import { Chip } from "@mui/material";
import TableChartIcon from "@mui/icons-material/TableChart";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs} from 'file-saver';

function ResultTable({ result }) {

    if (!result) return null;

    if (!result.success)
        return (
            <Typography color="error">
                {result.error}
            </Typography>
        );
    
    if (result.count === 0) {
        return (
            <Typography>
                Query executed successfully
                <br/>
                No matching records found.
            </Typography>
        );
    }


    const columns = result.columns.map((col) => ({
        field: col,
        headerName: col.toUpperCase(),
        flex: 1,
    }));

    const rows = result.rows.map((row, index) => {

        let obj = {
            id: index + 1,
        };

        result.columns.forEach((col, i) => {

            obj[col] = row[i];

        });

        return obj;

    });

function exportCSV() {

    if (!result || !result.success) return;

    let csv = result.columns.join(",") + "\n";

    result.rows.forEach((row) => {
        csv += row.join(",") + "\n";
    });

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );

    saveAs(blob, "query_results.csv");
}

    return (

        <>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >

                <Typography variant="h6">
                    Results
                </Typography>

                <Box
                    display="flex"
                    gap={2}
                    alignItems="center"
                >

                    <Chip
                        color="primary"
                        label={`${result.count} Rows`}
                    />

                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<DownloadIcon />}
                        onClick={exportCSV}
                    >
                        Export CSV
                    </Button>

                </Box>

            </Box>

            <Box
                sx={{
                    height: 400,
                    width: "100%"
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5,10,20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            }
                        }
                    }}
                />
            </Box>

        </>

    );

}

export default ResultTable;