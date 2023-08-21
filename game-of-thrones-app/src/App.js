import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function App() {
  const [characters, setCharacters] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [agifyAges, setAgifyAges] = useState({});

  
  const [page,setPage]=useState(1);
  const [gender,setGender]=useState();
  const [culture,setCulture]=useState();
  useEffect(() => {
    const params={
      page,
      gender,
      culture
    }
    axios.get(`https://anapioficeandfire.com/api/characters`,{params})
    .then((res)=>{setCharacters(res.data);
          console.log(characters)})
    .catch((err)=>console.log(err))
  }, [page,gender,culture]);

  useEffect(() => {
    const namesToGuess = characters
      .map(character => character.name.split(' ')[0])
      .filter(name => name !== '' && !agifyAges[name]);

    if (namesToGuess.length > 0) {
      Promise.all(
        namesToGuess.map(name =>
          fetch(`https://api.agify.io?name=${name}`)
            .then(response => response.json())
            .then(data => setAgifyAges(prevAges => ({ ...prevAges, [name]: data.age })))
        )
      );
    }
  }, [characters, agifyAges]);

  const handleSort = column => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };
  const sortedCharacters = [...characters].sort((a, b) => {
    const aValue = a[sortColumn] || '';
    const bValue = b[sortColumn] || '';
    return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
  });
  const filteredCharacters = sortedCharacters.filter(character => {
    return (
      character.name.toLowerCase().includes(filterText.toLowerCase()) ||
      character.gender.toLowerCase().includes(filterText.toLowerCase()) ||
      character.culture.toLowerCase().includes(filterText.toLowerCase())
    );
  });
  
  const sortedAndFilteredCharacters = filteredCharacters;
  

  return (
    <Box w='80%' m='auto' className="App">
      <Center><Heading >Game of Thrones Characters</Heading></Center>

     <Flex mt={10}>
      <Input type='text' placeholder="Filter by name, gender, culture on Columns..." value={filterText}  onChange={e => setFilterText(e.target.value)}/>
      <Select placeholder='Filter By Gender' onChange={(e)=>setGender(e.target.value)}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Select>

      <Select placeholder='Filter By Culture' onChange={(e)=>setCulture(e.target.value)}>
        <option value="Braavosi">Braavosi</option>
        <option value="Westeros">Westeros</option>
        <option value="Valyrian">Valyrian</option>
        <option value="Ironborn">Ironborn</option>
        <option value="Stormlands">Stormlands</option>
        <option value="Andal">Andal</option>
        <option value="Northmen">Northmen</option>
        <option value="Reach">Reach</option>
        <option value="Dornish">Dornish</option>
        <option value="Rivermen">Rivermen</option>
        <option value="Northern mountain clans">Northern mountain clans</option>
        <option value="First Men">First Men</option>
      </Select>
     </Flex>

  <TableContainer mt={10}>
  <Table variant='simple'>
    <Thead>
      <Tr>
        <Th onClick={() => handleSort('name')}>Name</Th>
        <Th onClick={() => handleSort('gender')}>Gender</Th>
        <Th onClick={() => handleSort('culture')}>Culture</Th>
        <Th>Age Guess</Th>
      </Tr>
    </Thead>
    <Tbody>
    {sortedAndFilteredCharacters.map(character => (
            <Tr key={character.url}>
              <Td>{character.name}</Td>
              <Td>{character.gender}</Td>
              <Td>{character.culture}</Td>
              <Td>{agifyAges[character.name.split(' ')[0]] || 'Unknown'}</Td>
            </Tr>
          ))}
    </Tbody>
  </Table>
</TableContainer>
<Center>
<Button onClick={()=>setPage(page-1)} isDisabled={page===1}>Prev</Button>
<Button>{page}</Button>
<Button onClick={()=>setPage(page+1)}>Next</Button>
</Center>
</Box>
  );
}

export default App;
