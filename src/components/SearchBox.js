import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, FormControl } from '@material-ui/core';
import Button from "../components/Ui/Button";
import CustomInput from "../components/Ui/Input";
import Form from './Form';
import { Search } from '../icons/icons';
import SearchSm from '../layouts/DashboardLayout/TopBar/Search'


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
    if (query) {
      props.handleSubmit(query);
      setQuery("");
    }
    else props.handleSubmit("");
  };

  let searchBox;

  if (props.type === 'general') {
    searchBox = (
      <>
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
          {props.title}
        </Button>
      </>
    )
  } else if (props.type === 'topBarSearch') {
    searchBox = (
      <Box sx={{ display: 'flex' }}>
        <CustomInput
          label={t("Search by part number")}
          type='text'
          id="query"
          value={query}
          onChange={handleQueryChange}
          name="query"
          inputTopBarSearch='inputTopBarSearch'
          inputContTopBarSearch='inputContTopBarSearch'
        />
        <Button
          type="submit"
          justIcon
          topBarSearchBtn='topBarSearchBtn'
          disabled={props.checkDisabled && query.length < 3}
        >
          <Search width='20' height='20' fill='#fff' />
        </Button>
      </Box>
    )
  } else if (props.type === 'topBarSearchSm') {
    searchBox = <SearchSm value={query} onChange={handleQueryChange} />
  }

  return (
    <Form onSubmit={handleQuerySubmit} id="search-form">
      {searchBox}
    </Form>
  );
}
