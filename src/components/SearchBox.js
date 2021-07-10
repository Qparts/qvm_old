import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, FormControl, } from '@material-ui/core';
import Button from "../components/Ui/Button";
import CustomInput from "../components/Ui/Input";
import Form from './Form';


export default function SearchTable(props) {
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
      <FormControl required style={{ width: '100%' }}>
        <CustomInput
          label={t("Search")}
          type='text'
          id="query"
          value={query}
          onChange={handleQueryChange}
          name="query"
        />
      </FormControl>
      <Box sx={{ mt: 3 }} />
      <Button
        type="submit"
        disabled={props.checkDisabled && query.length < 3}
      >
        {t("Car Details")}
      </Button>
    </Form>
  );
}
