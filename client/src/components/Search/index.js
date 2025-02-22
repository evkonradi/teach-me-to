import React, { useState } from "react";
import { Input } from "reactstrap";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_RESOURCES_SEARCH } from "../../utils/queries";
import { Button, Box } from "@chakra-ui/core";
import CardResource from "../CardResource";

const Search = () => {
  const [searchedArticles, { data }] = useLazyQuery(QUERY_RESOURCES_SEARCH);
  const [formState, setFormState] = useState({ searchText: "" });

  // update state based on search input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const doSearch = (event) => {
    event.preventDefault();

    try {
      searchedArticles({ variables: { text: formState.searchText } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <Box className="search">
        <Input className="center searchInputWidth" name="searchText" onChange={handleChange} /> 
        <Button
          size="md"
          height="40px"
          width="80px"
          border="2px"
          color="white"
          bg="#253237"
          _hover={{ bg: "#D99748" }}
          type="submit"
          onClick={doSearch}
        >
          <span role="img" aria-label="search">🔍 </span>
        </Button>
      </Box>

      {data ? (
        <>
          <br></br>
          {data.resources_search.map((article) => (
            
              <CardResource key={article._id} resource={article} useClass="card-img-size-search"></CardResource>
    
          ))}
          {data.resources_search.length === 0 &&
            <div className="noDataFound"><p>
              No data found! Please try another search.
              </p>
            </div>
          }
        </>
      ) : null}

    </main>
  );
};

export default Search;
