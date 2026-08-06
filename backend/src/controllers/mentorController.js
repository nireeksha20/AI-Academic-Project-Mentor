import * as mentorService from "../services/mentorService.js";

export async function askMentor(req, res) {
  try {
    const response = await mentorService.askMentor(req.body);

    res.json({
      success: true,
      response,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}
