import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import Button from "./button/CustomButton";
import { Search } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import Form from './Form';


export default function SearchTable(props) {
  //const classes = useStyles();
  const [query, setQuery] = useState("");

  const { currentTab = null } = props;

  const { t } = useTranslation();


  useEffect(() => {
    if (currentTab != null) {
      setQuery("");
    }
  }, [currentTab]);

  const handleQueryChange = ({ currentTarget: input }) => {
    setQuery(input.value);
  };

  const handleQuerySubmit = () => {
    if (query) props.handleSubmit(query);
    else props.handleSubmit("");
  };


  return (
    <Form onSubmit={handleQuerySubmit} id="search-form">
      <div className="input-group d-flex align-items-end row">
        <div className="col">
          <CustomInput
            labelText={t("Search")}
            id="query"
            value={query}
            inputProps={{
              onChange: handleQueryChange,
              name: "query",
            }}
            formControlProps={{
              fullWidth: true,
            }}
          />
        </div>
        <div className="col-auto px-0">
          <Button
            type="submit"
            justIcon
            round
            color="primary"
            aria-label="edit"
            disabled={props.checkDisabled && query.length < 3}
          >
            <Search />
          </Button>
        </div>
      </div>
    </Form>
  );
}
