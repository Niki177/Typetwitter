/**
 * postService.js
 * - Exports postTweet(payload) which is a mock for now.
 * - Replace with real X API call when ready.
 *
 * Example replacement (pseudo):
 * import axios from 'axios';
 * export async function postTweet(payload) {
 *   return axios.post('/.netlify/functions/postToX', payload);
 * }
 */

export async function postTweet(payload) {
  // simulate network latency
  await new Promise((r) => setTimeout(r, 700));
  // mock response
  return { ok: true, id: Date.now(), content: payload.text };
}
