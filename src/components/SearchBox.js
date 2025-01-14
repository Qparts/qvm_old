import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, FormControl } from '@material-ui/core';
import Button from "../components/Ui/Button";
import TextField from "../components/Ui/TextField";
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
          <TextField
            type='input'
            label={t("Search")}
            id="query"
            value={query}
            onChange={handleQueryChange}
            name="query"
          />
        </FormControl>
        <Box sx={{ mt: 3 }} />
        <Button type="submit">
          {props.title}
        </Button>
      </>
    )
  } else if (props.type === 'topBarSearch') {
    searchBox = (
      <Box sx={{ display: 'flex' }}>
        <TextField
          placeholder={props.placeholder}
          id="query"
          value={query}
          onChange={handleQueryChange}
          name="query"
          inputTopBarSearch='inputTopBarSearch'
          inputContTopBarSearch='inputContTopBarSearch'
          selectBg={props.bg ? 'selectBg' : ''}
        />
        <Button
          type="submit"
          justIcon
          topBarSearchBtn='topBarSearchBtn'
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
