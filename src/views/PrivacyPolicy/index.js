import React from 'react';
import Page from 'src/components/Page';
import { useTranslation } from 'react-i18next';
import { useTheme, makeStyles } from '@material-ui/core/styles';
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
                مشاركة المعلومات الخاصة بالمتاجر والتُجّار :
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ mb: 2 }}>
                بطبيعة الحال فإن منصة QVM تسعى بالاحتفاظ بهذه المعلومات بما يحفظ
                خصوصية التاجر والمستخدم، ومنصة QVM لا تحتفظ بهذه المعلومات إلا
                بهدف تحسين جودة المنصة وجودة عمل المتاجر وتسهيلاً وتيسيراً
                لأعمال التجار والمتاجر.
              </Typography>
              <Typography sx={{ mb: 2 }}>
                كقاعدة عامة فإن جميع هذه المعلومات لا يطلع عليها إلا بعض
                القائمين على منصة QVM وذلك بعد حصولهم على تصريح للاطلاع عليها من
                قِبل إدارة منصة QVM – عادة ما يكون التصريح محدد ومقيّد ويخضع
                لرقابة قانونية وإدارية من قِبل منصة QVM – ولن يتم نشر أو بث هذه
                المعلومات للغير.
              </Typography>
              <Typography>
                حيث أن منصة QVM تسعى للحفاظ على سلامة المستخدمين وحقوق التُجّار
                ، فإنه – في حال ملاحظة منصة QVM لأي نشاط غير نظامي أو غير شرعي
                يقوم به التاجر أو المستخدم – فإن منصة QVM تطبيقاً لمواد وبنود
                وأحكام اتفاقية الاستخدام وحيث أنها تسعى بقدر الإمكان إلى الحفاظ
                على سلامة عمل النظام فإنها قد تشارك أيٍ من هذه المعلومات مع
                الجهات المختصة لاتخاذ اللازم حيال التاجر والمستخدم أو النظام
                المخالف ، وذلك لحماية منصة QVM وباقي التُجّار والمتاجر
                والمستهلكين من أي مسائلة قانونية قدّ تطرأ على المنصة أو على أحد
                مستخدميها نتيجة لهذا النشاط الغير شرعي أو الغير نظامي.
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
                ما هو مدى أمان سرية المعلومات الخاصة بالتُجّار أو المتاجر:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                تسعى منصة QVM إلى الحفاظ على سرية معلومات مستخدمين المنصة ، وحيث أن سياسة الخصوصية الخاصة بالتُجّار أو المخزون لن تخالف أحكام اتفاقية الاستخدام أو سياسة الخصوصية وسرية المعلومات. ولكن نظراً لعدم إمكانية ضمان ذلك 100% في ( فضاء الإنترنت ) فإن فريق عمل منصة QVM ، ينوّه على يلي:
              </Typography>
              <ul className={classes.list}>
                <li>
                  تسعى منصة QVM إلى الحفاظ على جميع المعلومات الخاصة بالمخزون وألا يطلع عليها أي شخص بما يخالف السياسة المعمول بها في منصة QVM.
                </li>
                <li>
                  تعمل منصة QVM على حماية معلومات التُجّار والمتاجر بموجب أنظمة حماية إلكترونية وتقنية ذات جودة عالية وتُحدّث بشكل مستمر ودوري.
                </li>
                <li>
                  غير أنه نظراً لأن شبكة الانترنت لا يمكن ضمانها 100% لما قد يطرأ من اختراق أو فيروسات على أنظمة الحماية الالكترونية و على جدران الحماية المعمول بها في منصة QVM فإن منصة QVM تنصح التجار بالحفاظ على معلوماتهم بسرية تامة، وعدم إفشاء أي معلومات يراها التاجر أو المستخدم هامة جداً له، وهذا حرصاً من منصة QVM على حماية وتوجيه وإرشاد التٌجّار والمخزون.
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
                الخدمات الإستراتيجية واللوجستية ( خدمات الطرف الثالث ) :
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                يُقر التاجر والمستخدم بعلمه التام والنافي للجهالة بأنه في حال تقدّم لطلب الاشتراك في خدمة مُقدّمة عن طريق طرف ثالث ، بأنه يمنح تصريح وتخويل وإذن كامل وتام إلى منصة QVM بتزويد مُقدّم الخدمة ببيانات التاجر والمستخدم أو النظام أو المستخدم المشترك لدى مُقدِم الخدمة ، مثل: اسم المستخدم – الهاتف الشخصي – البريد الإلكتروني – رقم الهوية أو الإقامة – عنوان المنزل ، وغير ذلك من المعلومات التي يحتاجها مقدّم الخدمة ( الطرف الثالث ). وذلك حتى يتمكّن مقدم الخدمة ( الطرف الثالث ) من تقديم الخدمة المطلوبة والتي اشترك بها المستخدم.
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
                قواعد وأحكام استخدام منصة QVM :
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                إن جميع التزامات منصة QVM، وجميع التزامات التجار والمستخدمين، وجميع الحقوق الواردة في العلاقة بين التاجر والمستخدم ومنصة QVM، حيث أن هذه القواعد هي “سياسة الخصوصية وسرية المعلومات” والمنبثقة من الاتفاقية التي أبرمت بين التاجر والمستخدم ومنصة QVM عند تأسيسه للمتجر، وقد وضعت سياسة الخصوصية وسرية المعلومات لضمان المصداقية والثقة التي تحرص منصة QVM على توفيرها للتجار.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Page>
  );
}

export default PrivacyPolicy;