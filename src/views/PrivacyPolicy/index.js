import React from 'react';
import Page from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    padding: theme.spacing(13, 0, 4)
  },
  heading: {
    color: theme.palette.secondary.main,
    lineHeight: 1,
    marginRight: '0.5rem'
  },
  orderedList: {
    paddingLeft: theme.spacing(5),
    '& li': {
      marginBottom: theme.spacing(2)
    }
  },
  list: {
    listStyle: 'outside',
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    '& li': {
      marginBottom: theme.spacing(2)
    }
  }
}));

// ----------------------------------------------------------------------

function PrivacyPolicy({ formik }) {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Page className={classes.root}>
      <Container maxWidth="lg">
        <Box>
          <Typography variant="h3" gutterBottom className={classes.heading}>{t("Privacy Policy")}</Typography>
          <Typography variant="body1" sx={{ mb: 5, mt: 3 }}>
            {t("The QVM spare parts dealers platform team welcomes you through its online platform, The QVM platform thanks you for your trust in the platform, and the QVM platform informs you that In the interest of the QVM platform and its full awareness that the merchant and the user have certain rights Through the QVM platform, the QVM platform seeks to preserve the information of merchants In accordance with the mechanism of the privacy policy and confidentiality of information in force in the QVM platform, Accordingly, the QVM platform notes that according to the usage agreement between you As merchants and between the QVM platform, this document informs you of the Privacy Policy And the confidentiality of the information in force in the QVM platform, and that in accordance with Clause IV of Article 15 of the User Agreement has created this QVM platform Rules “Privacy Policy and Confidentiality of Information” to clarify and define the confidentiality mechanism And the privacy in force in the QVM electronic platform, and please inform you about it Since you are accessing the QVM platform and establishing the online store, all Your information is subject to this policy")}
          </Typography>
        </Box>
        <Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                {t("Information that the QVM platform obtains and maintains in its electronic systems")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ol className={classes.orderedList}>
                <li>
                  {t("Personal information of the merchant and user, such as name, age, e-mail, national identity number or residence number")}
                </li>
                <li>
                  {t("Information about the system and its legal entity, such as the commercial registration number and a copy of the commercial register")}
                </li>
                <li>
                  {t("Personal login information for the electronic system, such as the user name, password, e-mail, and the question and answer for retrieval of the password")}
                </li>
                <li>
                  {t("In the event that the merchant and the user do not provide the information requested from him, the QVM platform may try to obtain it through other sources")}
                </li>
              </ol>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                {t("Information about the operations, goods or services of the system")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ol className={classes.orderedList}>
                <li>
                  {t("Operations in the system because the merchant and user use the services provided by the QVM platform")}
                </li>
                <li>{t("The type of goods or services offered in the system platform")}</li>
                <li>
                  {t("User performance, in case there is a need to direct support or advice and guidance to merchants or users to help them and improve their performance")}
                </li>
              </ol>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                {t("Information of shop consumers or customers or customers of merchants")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("As the QVM platform seeks to maintain the quality of the work of stores, and improve the quality of their work, it is constantly informed of the number of consumers of the system, their customers and their segments")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <Typography className={classes.heading}>
                {t("Sharing information about stores and merchants")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ mb: 2 }}>
                {t("Of course, the QVM platform seeks to retain this information in a manner that preserves the privacy of the merchant and user, and the QVM platform does not keep this information except for the purpose of improving the quality of the platform and the quality of the work of stores and to facilitate and facilitate the work of merchants and stores")}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                {t("As a general rule, all this information is only seen by some QVM platform administrators after they obtain permission to view it from the QVM platform management - usually the permission is specific, restricted and subject to legal and administrative control by the QVM platform - and this information will not be published or broadcast to others")}
              </Typography>
              <Typography>
                {t("As the QVM platform seeks to preserve the safety of users and the rights of merchants, so - in the event that the QVM platform notices any illegal or illegal activity carried out by the merchant or the user - the QVM platform is in application of the articles, terms and provisions of the usage agreement and where it seeks as much as possible to maintain the integrity of The work of the system, it may share any of this information with the competent authorities to take the necessary action against the merchant and the user or the violating system, in order to protect the QVM platform and the rest of the merchants, merchants and consumers from any legal liability that may arise on the platform or one of its users as a result of this illegal or illegal activity")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <Typography className={classes.heading}>
                {t("How secure is the confidentiality of information about merchants or stores")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("The QVM Platform seeks to maintain the confidentiality of the information of the users of the platform, and that the privacy policy of merchants or inventory will not violate the provisions of the use agreement or the privacy and confidentiality of information policy However, since this cannot be guaranteed 100% in the (internet space), the QVM platform team notes the following")}
              </Typography>
              <ul className={classes.list}>
                <li>
                  {t("QVM seeks to keep all inventory information and not to be exposed to anyone in violation of the policy of the QVM platform")}
                </li>
                <li>
                  {t("The QVM platform protects merchants and merchants' information with high quality electronic and technical security systems that are continuously and periodically updated")}
                </li>
                <li>
                  {t("However, since the Internet cannot be guaranteed 100% of what may occur from penetration or viruses to electronic protection systems and the firewalls in force in the QVM platform, the QVM platform advises merchants to keep their information strictly confidential, and not to disclose any information that the merchant or user sees Very important to him, and this is the QVM platform's keenness to protect, guide and guide merchants and inventory")}
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <Typography className={classes.heading}>
                {t("Strategic and logistical services (third party services)")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("The merchant and the user acknowledge with full and complete knowledge that if he applies for a subscription to a service provided by a third party, he grants full and complete permission, authorization and permission to the QVM platform to provide the service provider with the data of the merchant and the user, the system or the user subscribed to the service provider, such as username , Personal phone , e-mail , ID or residence number , home address, and other information needed by the service provider (the third party) This is so that the service provider (the third party) can provide the requested service to which the user has subscribed")}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel7a-content"
              id="panel7a-header"
            >
              <Typography className={classes.heading}>
                {t("QVM platform usage rules and conditions")}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("All obligations of the QVM platform, and all obligations of merchants and users, and all rights contained in the relationship between the merchant, the user and the QVM platform, as these rules are the “Privacy Policy and Confidentiality of Information” stemming from the agreement concluded between the merchant, the user and the QVM platform when establishing the store, and the policy of Privacy and confidentiality of information to ensure the credibility and trust that the QVM platform is keen to provide to merchants")}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Page>
  );
}

export default PrivacyPolicy;