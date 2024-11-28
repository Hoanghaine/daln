import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import parse from 'html-react-parser';

export default function QuizResult({ resultData }: { resultData: any }) {
  const { candidates } = resultData.data || {};
  const contentHtml = candidates?.[0]?.content?.parts?.[0]?.text || '';
  const parsedContent = parse(contentHtml);

  return (
    <Box
      sx={{
        padding: '30px',
        borderRadius: '16px',
        backgroundColor: '#fff',
        maxWidth: '800px',
        margin: 'auto',
      }}
    >
      <Typography variant="h4" color="#3C5EAB" textAlign="center" mb={4}>
        KẾT QUẢ BÀI KIỂM TRA
      </Typography>
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '16px',
          border: '1px solid #ddd',
        }}
      >
        {parsedContent}
      </Box>
      <Stack
        direction="row"
        justifyContent="center"
        spacing={2}
        mt={4}
      >
        <Button variant="contained" startIcon={<FileDownloadOutlinedIcon />}>
          Tải Báo Cáo
        </Button>
        <Button variant="contained" startIcon={<EmailOutlinedIcon />}>
          Gửi Báo Cáo Qua Email
        </Button>
      </Stack>
    </Box>
  );
}
