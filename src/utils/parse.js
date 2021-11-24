export function parseLocalName(sido) {
  return sido.replace(/특별|자치/g, "");
}

export function parseDate(tdate) {
  const created = new Date(tdate);
  const now = new Date();
  const diff = Math.floor((now - created) / 1000);
  if (diff <= 1) {
    return "방금";
  }
  if (diff < 20) {
    return diff + "초 전";
  }
  if (diff < 40) {
    return "30초 전";
  }

  if (diff <= 90) {
    return "1분 전";
  }
  if (diff <= 3540) {
    return Math.round(diff / 60) + "분 전";
  }
  if (diff <= 5400) {
    return "1 hour ago";
  }
  if (diff <= 86400) {
    return Math.round(diff / 3600) + "시간 전";
  }
  if (diff <= 129600) {
    return "1일 전";
  }
  if (diff < 604800) {
    return Math.round(diff / 86400) + "일 전";
  }
  if (diff <= 777600) {
    return "1 week ago";
  }
  const month = created.toLocaleDateString("default", { month: "long" });
  return `${month} ${created.getDate()}`;
}
