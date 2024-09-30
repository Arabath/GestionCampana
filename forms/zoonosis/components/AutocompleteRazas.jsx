import ListaDinamica from './ListaDinamica'
import InputContainer from '../../../common/components/InputContainer';

  function AutocompleteRazas({ data, css }) {
  const tiposRaza = data?.TiposRaza || []
  const tiposTama = data?.TiposTamaño || []
  const tiposPelajeColor = data?.TiposPelajeColor || []
  const tiposPelajeTama = data?.TiposPelajeTamaño || []
  
  return (
    <>
      <InputContainer>
        <ListaDinamica label="Raza" css={css} lista_din={tiposRaza} name='tiposRaza'/>
        <ListaDinamica label="Tamaño" css={css} lista_din={tiposTama} name='tiposTama'/>
      </InputContainer>
      <InputContainer>
        <ListaDinamica label="color" css={css} lista_din={tiposPelajeColor} name='tiposPelajeColor'/>
        <ListaDinamica label="Pelaje" css={css} lista_din={tiposPelajeTama} name='tiposPelajeTama'/>
      </InputContainer>
      
    </>
  );
}

export default AutocompleteRazas