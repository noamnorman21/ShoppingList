import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box, Modal, Button, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingListItem from './ShopListItem';
import '../myStyle/ShoppingList.css';

const CategorySection = ({ shoppingList, categories, onEditProduct }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleOpenModal = (category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleViewBasketItems = () => {
        // Open the modal when the "צפה בפריטים בסל" button is clicked
        handleOpenModal('סל הקניות');
    };

    const getTotalItemsInCategory = (category) => {
        return shoppingList.items
            .filter(product => product.category === category)
            .reduce((total, product) => total + product.quantity, 0);
    };

    return (
        <Grid id={"formContainer"}>
            <Grid id="addProduct" item xs={12} md={12}>
                <Button id={"addBtn"} variant="contained" onClick={handleViewBasketItems}>
                    צפה בפריטים בסל
                </Button>
            </Grid>
            {/* Modal for displaying basket items */}
            <Modal open={modalOpen} onClose={handleCloseModal} aria-labelledby="modal-title">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 500,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        '@media (max-width: 600px)': {
                            width: '90%',
                        },
                    }}
                >

                    {/* Display categories dynamically */}
                    {categories.map((category, index) => {
                        const totalItemsInCategory = getTotalItemsInCategory(category.categoryName);
                        const categoryImg = require(`../Imgs/${category.categoryImg.trim()}.png`);
                        return (
                            <Accordion key={index}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`category-panel-${index}`}
                                    id={`category-header-${index}`}
                                    sx={{ justifyContent: 'space-between', paddingRight: '16px' }}
                                    onClick={() => handleOpenModal(category.categoryName)}
                                >
                                    {/* Customized Accordion Header */}
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={categoryImg} alt={category.categoryName} style={{ width: '40px', height: '40px', marginLeft: '20px' }} />
                                        <Typography id={"typoStyle"}>{category.categoryName} - {totalItemsInCategory} </Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography component="div" style={{ padding: '2px' }}>
                                        {/* Use ShoppingListItem component or any custom content */}
                                        <ShoppingListItem
                                            shoppingList={shoppingList}
                                            category={category.categoryName}
                                            onEditProduct={onEditProduct}
                                        />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}

                    {/* Close button */}
                    <Button
                        id={"closeBtn"}
                        variant="outlined" onClick={handleCloseModal}>
                        סגור
                    </Button>
                </Box>
            </Modal>
        </Grid>
    );
};

export default CategorySection;
