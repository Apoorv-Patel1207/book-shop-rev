import { Box, Typography } from "@mui/material"

interface NoDataFoundProps {
  message?: string
  description?: string
}

const NoDataFound = (props: NoDataFoundProps) => {
  const { message = "No Data Found", description } = props
  return (
    <Box
      textAlign='center'
      p={4}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        component='img'
        src='/images/no-data.png'
        alt='No Data found'
        sx={{ width: "150px", height: "150px", mb: 2 }}
      />
      <Typography variant='h6' color='text.secondary'>
        {message}
      </Typography>
      <Typography color='text.secondary' sx={{ mb: 2 }}>
        {description}
      </Typography>
    </Box>
  )
}

export default NoDataFound
