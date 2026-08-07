import {pythonApi} from './axiosInstance';

export const generateReportPdf = (siteId, reportType, reportData) =>
    pythonApi.post("/reports/generate-pdf", { siteId, reportType, reportData }).then((response) => response.data);

export const compareProgress = (siteId, beforeUrl, afterUrl) =>
    pythonApi.post("/progress/compare-image", {siteId, beforeUrl, afterUrl}).then((response) => response.data);

export const predictDelay = (siteId, plannedEndDate) =>
  pythonApi.post("/progress/predict-delay", { siteId, plannedEndDate }).then((res) => res.data);

export const askChatbot = (question, projectContext) =>
  pythonApi.post("/chatbot/query", { question, projectContext }).then((res) => res.data);
