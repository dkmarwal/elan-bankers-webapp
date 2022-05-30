import React, { Fragment } from 'react';
import {
    Modal,
    Button,
    Grid,
    Paper,
    CircularProgress,
    Box,
    withStyles,
    makeStyles,
    DialogTitle, Dialog, DialogActions, DialogContent, IconButton
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import './styles.scss';
import Cookies from 'universal-cookie';
import LeftPagination from "./LeftPagination/";
import Form1 from "./Forms/Form1";
import Form2 from "./Forms/Form2";
import Form3 from "./Forms/Form3";
import Form4 from "./Forms/Form4";
import Form5 from "./Forms/Form5";
import Form6 from "./Forms/Form6";

const SwitchedComponent = (props) => {
    let Output; // save the rendered JSX to return

    // check the type of the component given in props
    switch (props.page) {
        //render form1 with props
        case 1:
            Output = (<Form1 {...props} />);
            break;
        //render form2 with props
        case 2:
            Output = (<Form2 {...props} />);
            break;
        case 3:
            Output = (<Form3 {...props} />);
            break;
        case 4:
            Output = (<Form4 {...props} />);
            break;
        case 5:
            Output = (<Form5 {...props} />);
            break;
        case 6:
            Output = (<Form6 {...props} />);
            break;
        default:
            Output = (<Form1 {...props} />);
            break;
    }

    return Output; // return the output created in switch/case

};

const TaxForm = (props) => {
    const { title, px, py, onConfirm, clickOutsideToClose, onClose, canReview, canSubmit, canResubmit, canEditSSN, formData,
        processingView, processingEdit, processingDraft, processingSubmit, processingReview, processingResubmit, handleChange,
        handleEdit, handleDraft, handleSubmit, handleReview, handleResubmit, handleCancel, processingDownload, handleDownload, formPageNo, handleFormPageChange, errors } = props;
    console.log("form dataaaa ", props);

    if (processingView) {
        return <Box display="flex" p={10} justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
    }

    const cookies = new Cookies(window.document.cookie);

    return (
        <Fragment>
            <Box display="flex" style={{ padding: "1rem", margin: "0 auto", backgroundColor: "#f9f9f9", zIndex: 6, boxSizing: "border-box" }} >
                <Box flexGrow={1}>
                    {processingDownload ? (
                        <Box display="flex" justifyContent="flex-start" alignItems="flex-start"><CircularProgress color="primary" /></Box>
                    ) : (
                        <Button variant="outlined" color="primary" xs={6} style={{ margin: "0 1rem" }} onClick={handleDownload}>Download Sample W9 Form</Button>
                    )
                    }
                </Box>
                {processingEdit ? (
                    null
                ) : (
                    cookies.get("client") !== "hd" ? <Button variant="outlined" color="primary" xs={6} onClick={handleEdit} >Edit</Button> :

                        processingView && processingEdit && cookies.get("client") !== "hd" ? null : <Button variant="outlined" color="primary" xs={6} onClick={handleSubmit} >Submit</Button>

                )
                }
                {canSubmit && <Box >
                    {processingDraft ? (
                        <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                    ) : (
                        processingEdit && cookies.get("client") !== "hd" ? <Button variant="outlined" color="primary" xs={6} style={{ margin: "0 1rem" }} onClick={handleDraft} >save as draft </Button> : null
                    )
                    }

                    {processingSubmit ? (
                        <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                    ) : (
                        processingEdit && <Button variant="outlined" color="primary" xs={6} onClick={handleSubmit} >Submit</Button>
                    )
                    }
                </Box>
                }
                {!canSubmit && <Box>
                    {canResubmit ? null : (processingReview ? (
                        <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                    ) : (
                        canReview && <Button variant="outlined" color="primary" xs={6} style={{ margin: "0 1rem" }} onClick={handleReview}>Acknowledge</Button>
                    ))
                    }

                    {processingEdit && cookies.get("client") !== "hd" ?
                        (<Box>
                            <Button variant="outlined" color="primary" xs={6} style={{ margin: "0 1rem" }} onClick={handleCancel} >Cancel</Button>
                            {processingResubmit ? (
                                <Box display="flex" justifyContent="center" alignItems="center"><CircularProgress color="primary" /></Box>
                            ) : (
                                <Button variant="outlined" color="primary" xs={6} onClick={handleResubmit} >Resubmit</Button>
                            )
                            }
                        </Box>) : (
                            cookies.get("client") == "hd" ? <Button variant="outlined" color="primary" xs={6} onClick={handleSubmit} >Submit</Button> : null
                        )
                    }
                </Box>
                }
            </Box>
            <Box py={py || 6} px={px || 6}>
                <div style={{ display: "flex" }} id="taxation-form">
                    <LeftPagination
                        selectedPage={formPageNo}
                        handleFormPageChange={(pageNo) => handleFormPageChange(pageNo)}
                    />
                    <div
                        style={{
                            width: "780px",
                            background: "#fff",
                            padding: "50px",
                            fontFamily: "Arial, Helvetica, sans-serif",
                            margin: "0 auto"
                        }}
                    >
                        <SwitchedComponent
                            canEdit={processingEdit}
                            canEditSSN={canEditSSN}
                            page={formPageNo}
                            errors={errors}
                            formData={formData}
                            handleChange={handleChange} />
                    </div>
                </div>
            </Box>
        </Fragment>
    );
}
export default TaxForm;