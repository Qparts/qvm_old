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
          <Typography variant="h3" gutterBottom className={classes.heading}>
            سياسة الخصوصية
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, mt: 3 }}>
            يرحّب بكم فريق عمل منصة تجار قطع الغيار QVM عبر منصته الالكترونية،
            وتتقدّم منصة QVM بالشكر على ثقتكم بالمنصة، وتفيدكم منصة QVM بأنه
            حرصاً من منصة QVM وادراكها التام بأن التاجر والمستخدم له حقوق معيّنة
            عبر منصة QVM، فإن منصة QVM تسعى للحفاظ على المعلومات الخاصة بالتجار
            وفقاً لآلية سياسة الخصوصية وسرية المعلومات المعمول بها في منصة QVM .
            وعليه فإن منصة QVM تنوّه بأنه وفقاً لاتفاقية الاستخدام المبرمة بينكم
            كتجار وبين منصة QVM فإن هذه الوثيقة تحيطكم علماً بسياسة الخصوصية
            وسرية المعلومات المعمول بها في منصة QVM، وأنه وفقاً للبند الرابع من
            المادة الخامسة عشرة من اتفاقية الاستخدام فقد أنشأت منصة QVM هذه
            القواعد “سياسة الخصوصية وسرية المعلومات” لتوضيح وتحديد آلية السرية
            والخصوصية المعمول بها في منصة QVM الالكترونية، ويرجى اطلاعكم عليها
            حيث أنكم بولوجكم إلى منصة QVM وتأسيسكم للمتجر الالكتروني فإن جميع
            معلوماتكم تخضع لهذه السياسة.
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
                المعلومات التي تحصل عليها منصة QVM وتحتفظ بها في أنظمتها
                الإلكترونية:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ol className={classes.orderedList}>
                <li>
                  المعلومات الشخصية الخاصة بالتاجر والمستخدم، كالاسم والعمر
                  والبريد الالكتروني، ورقم الهوية الوطنية أو رقم الإقامة.
                </li>
                <li>
                  المعلومات الخاصة بالنظام وكيانه القانوني، كرقم السجل التجاري
                  وصورة من السجل التجاري.
                </li>
                <li>
                  معلومات الدخول الشخصية الخاصة بالنظام الالكتروني، مثل اسم
                  المستخدم وكلمة السر والبريد الالكتروني، والسؤال الخاص باسترجاع
                  كلمة السر وإجابته.
                </li>
                <li>
                  في حال عدم توفير التاجر والمستخدم للمعلومات المطلوبة منه فإن
                  منصة QVM قدّ تحاول الحصول عليها عبر مصادر أخرى.
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
                معلومات العمليات أو البضائع أو الخدمات الخاصة بالنظام:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ol className={classes.orderedList}>
                <li>
                  العمليات الحاصلة في النظام وذلك لكون التاجر والمستخدم يستخدم
                  الخدمات التي توفّرها منصة QVM.
                </li>
                <li>نوع البضائع أو الخدمات المعروضة في منصة النظام.</li>
                <li>
                  أداء المستخدمين وذلك في حال استدعت الحاجة إلى توجيه الدعم أو
                  النصح والإرشاد للتُجّار أو المستخدمين لمساعدتهم وتحسين أدائهم.
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
                معلومات مستهلكي المتاجر أو عملاء أو زبائن التجار:
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                حيث أن منصة QVM تسعى إلى الحفاظ على جودة عمل المتاجر، وتحسين
                جودة أعمالهم، فإنها تطلع باستمرار على عدد مستهلكي النظام
                وعملائهم وشرائحهم.
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
            <Typography sx={{mb:2}}>
                بطبيعة الحال فإن منصة QVM تسعى بالاحتفاظ بهذه المعلومات بما يحفظ
                خصوصية التاجر والمستخدم، ومنصة QVM لا تحتفظ بهذه المعلومات إلا
                بهدف تحسين جودة المنصة وجودة عمل المتاجر وتسهيلاً وتيسيراً
                لأعمال التجار والمتاجر.
              </Typography>
              <Typography sx={{mb:2}}>
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