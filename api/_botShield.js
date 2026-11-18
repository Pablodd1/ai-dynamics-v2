// Shared anti-bot & spam detector for /api/contact and /api/lead (free, zero external deps)

const RANDOM_GIBBERISH_CASE_REGEX = /(?:[a-z][A-Z]){3,}|(?:[A-Z][a-z]){4,}/
const DOTTED_GMAIL_REGEX = /^([^.@]+\.){4,}[^.@]+@gmail\.com$/i

/**
 * Returns a short reason string if the submission matches automated bot heuristics, or null if human.
 */
export function detectBotSubmission({
  name = '',
  email = '',
  message = '',
  honeypot = '',
  submittedAtMs,
} = {}) {
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return 'honeypot_filled'
  }

  const cleanEmail = String(email || '').trim().toLowerCase()
  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return 'invalid_email'
  }

  // Obfuscated dotted-gmail spammer addresses (e.g. k.a.x.o.doz.upa.fu3.1@gmail.com)
  if (DOTTED_GMAIL_REGEX.test(cleanEmail)) {
    return 'dotted_gmail_spam'
  }

  const trimmedName = String(name || '').trim()
  if (trimmedName) {
    const isSingleToken = !/\s/.test(trimmedName)
    const upperCount = (trimmedName.match(/[A-Z]/g) || []).length
    const lowerCount = (trimmedName.match(/[a-z]/g) || []).length
    const upperTransitions = (trimmedName.match(/[a-z][A-Z]/g) || []).length
    if (
      isSingleToken &&
      trimmedName.length >= 10 &&
      ((upperCount >= 4 && lowerCount >= 3) ||
        upperTransitions >= 3 ||
        RANDOM_GIBBERISH_CASE_REGEX.test(trimmedName))
    ) {
      return 'gibberish_name'
    }
  }

  // Bots that submit only a raw 10-digit string in the message field alongside a suspicious name
  const trimmedMsg = String(message || '').trim()
  if (trimmedMsg && /^\d{10}$/.test(trimmedMsg) && trimmedName && !/\s/.test(trimmedName)) {
    return 'numeric_bot_payload'
  }

  // Sub-second headless/curl form POST check when _ts is provided
  if (submittedAtMs !== undefined && submittedAtMs !== null && submittedAtMs !== '') {
    const ts = Number(submittedAtMs)
    if (Number.isFinite(ts) && ts > 0) {
      const elapsed = Date.now() - ts
      if (elapsed >= 0 && elapsed < 1000) {
        return 'too_fast'
      }
    }
  }

  return null
}
