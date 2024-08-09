import db from "../../models/index.js";
import { Op } from "sequelize";
import { createNewToken, verifyToken } from "../../middleware/auth.js";

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit integer OTP
};

const RequestOtp = async (req, res) => {
  const { mobile_no } = req.body;
  try {
    // Find user by mobile number
    const user = await db.User.findOne({ where: { mobile_no } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate OTP and expiry time
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes

    // Save OTP to the Login table
    await db.Login.create({
      userId: user.id,
      otp,
      otpExpiry: otpExpiry,
      verified: false,
    });

    // Send OTP via SMS (implementation needed)
    console.log(`OTP for ${mobile_no}: ${otp}`);

    res.json({ message: `OTP sent successfully`, otp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  const { mobile_no, otp } = req.body;
  try {
    // Find user by mobile number
    const user = await db.User.findOne({ where: { mobile_no } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the OTP record
    const loginRecord = await db.Login.findOne({
      where: {
        userId: user.id,
        otp,
        otpExpiry: { [Op.gt]: new Date() },
        verified: false,
      },
    });

    if (!loginRecord) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Mark OTP as verified
    loginRecord.verified = true;
    await loginRecord.save();

    // Extract necessary fields from the user object
    const userPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
      mobile_no: user.mobile_no,
      role: user.role, // Include any other fields you need in the token
    };

    // Generate JWT token
    const { accessToken, refreshToken } = createNewToken(userPayload);

    res.json({
      message: "OTP verified successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    // Await the resolved value from verifyToken
    const decoded = await verifyToken(token);

    // Ensure decoded is an object and has an id property
    if (!decoded || typeof decoded !== "object" || !decoded.id) {
      return res.status(401).json({ error: "Invalid token or missing ID" });
    }

    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const loginRecord = await db.Login.findOne({
      where: {
        userId: user.id,
        verified: true,
      },
      order: [["created_at", "DESC"]],
    });

    if (!loginRecord) {
      return res.status(400).json({ error: "Login session not found" });
    }

    loginRecord.verified = false;
    await loginRecord.save();

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: error.message });
  }
};

// mobile apis
const mobileLogin = async (req, res) => {
  const { mobile_no } = req.body;
  console.log(req.body);
  try {
    if (mobile_no?.length !== 10) {
      return res
        .status(400)
        .json({ error: "Mobile number length should be eqaul to 10" });
    }
    // Generate OTP and expiry time
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes

    const saveOtp = await db.OTP.create({
      mobile_no: mobile_no,
      otp: otp,
      is_used: false,
    });

    res.json({ message: `OTP sent successfully`, otp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyMobileOtp = async (req, res) => {
  const { mobile_no, otp } = req.body;
  try {
    // Find user by mobile number
    const user = await db.OTP.findOne({ where: { mobile_no } });
    if (!user) {
      return res.status(400).json({ error: "Wrong mobile number" });
    }

    if (
      user?.mobile_no == mobile_no &&
      user?.otp == otp &&
      user?.is_used == false
    ) {
      user.set({
        is_used: true,
      });

      await user.save();

      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      return res.status(404).json({ error: "OTP not verified" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, age, city, email, mobile_no } = req.body;

    const user = await db.User.findOne({ where: { mobile_no, verified: true } });
    console.log("user", user);
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    

    // Generate OTP and expiry time
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000); // OTP valid for 10 minutes

console.log('otp',otp);
    console.log('here');
    // Save OTP to the Login table
    // await db.OTP.create({
    //   mobile_no,
    //   otp,
    //   is_used: false
    // });

   

      const saveUser = await db.User.create({
       username : name,
       age,
       city,
       email,
       mobile_no,
       ekyc_verified:false,
       nominee_verified: false,
       bank_verified: false,
       is_obsolate: false,
       verified: false,
       created_by : 'user',
       updated_by : ''
    });

     // Save OTP to the Login table
     await db.Login.create({
      userId: saveUser?.dataValues?.id,
      otp,
      otpExpiry: otpExpiry,
      verified: false,
    });



    // Send OTP via SMS (implementation needed)
    console.log(`OTP for ${mobile_no}: ${otp}`);

    res.json({ message: `OTP sent successfully`, otp });

  

    // console.log('save',saveUser);

    // Extract necessary fields from the user object
    //  const userPayload = {
    //   id: saveUser?.dataValues.id,
    //   username: user?.dataValues?.username,
    //   email: user?.dataValues?.email,
    //   // mobile_no: user?.dataValues?.mobile_no,
    //   role: "investor" // Include any other fields you need in the token
    // };

    // Generate JWT token
    // const { accessToken, refreshToken } = createNewToken(userPayload);

    // return res.status(200).json({data:saveUser, message: 'User added successfully', accessToken, refreshToken });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
};

export { RequestOtp, verifyOtp, logout, mobileLogin, verifyMobileOtp, addUser };
